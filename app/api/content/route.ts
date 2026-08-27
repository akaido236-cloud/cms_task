import { NextResponse } from 'next/server';
import { getDb, getAdminPassword } from '@/lib/cloudflare';
import { isValidSession } from '@/lib/auth';
import { getFallbackContent, readContent, writeContent, type Content } from '@/lib/content';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getDb();
  const content = await readContent(db);
  return NextResponse.json({ ok: true, content, source: db ? 'd1' : 'fallback' });
}

export async function PUT(request: Request) {
  const token = request.headers.get('cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith('cms_session='))?.slice('cms_session='.length);
  if (!(await isValidSession(token, await getAdminPassword()))) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const db = await getDb();
  if (!db) return NextResponse.json({ ok: false, error: 'D1 is not configured yet.' }, { status: 503 });
  try {
    const content = (await request.json()) as Content;
    if (!content || typeof content !== 'object') throw new Error('Invalid content');
    await writeContent(db, content);
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Invalid request' }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const token = request.headers.get('cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith('cms_session='))?.slice('cms_session='.length);
  if (!(await isValidSession(token, await getAdminPassword()))) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const db = await getDb();
  if (!db) return NextResponse.json({ ok: false, error: 'D1 is not configured yet.' }, { status: 503 });
  await writeContent(db, getFallbackContent());
  return NextResponse.json({ ok: true, message: 'Seeded default content' });
}

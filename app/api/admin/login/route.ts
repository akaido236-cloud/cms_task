import { NextResponse } from 'next/server';
import { getAdminPassword } from '@/lib/cloudflare';
import { createSession } from '@/lib/auth';


export async function POST(request: Request) {
  const expected = await getAdminPassword();
  if (!expected) return NextResponse.json({ ok: false, error: 'CMS_ADMIN_PASSWORD is not configured.' }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  if (body.password !== expected) return NextResponse.json({ ok: false, error: 'Invalid password.' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  const secure = new URL(request.url).protocol === 'https:';
  response.cookies.set('cms_session', await createSession(expected), { httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
  return response;
}

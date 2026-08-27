import fallbackContent from '@/data/content.json';

export type Content = typeof fallbackContent;

export function getFallbackContent(): Content {
  return fallbackContent;
}

export async function readContent(db: D1Database | undefined): Promise<Content> {
  if (!db) return fallbackContent;
  const row = await db.prepare('SELECT content FROM site_content WHERE id = 1').first<{ content: string }>();
  if (!row?.content) return fallbackContent;
  try { return JSON.parse(row.content) as Content; } catch { return fallbackContent; }
}

export async function writeContent(db: D1Database | undefined, content: Content) {
  if (!db) throw new Error('D1 database is not configured.');
  await db.prepare(`INSERT INTO site_content (id, content, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET content=excluded.content, updated_at=CURRENT_TIMESTAMP`).bind(JSON.stringify(content)).run();
}

import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function getDb(): Promise<D1Database | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.SD_MEDIA_DB as D1Database | undefined;
  } catch {
    return undefined;
  }
}

export async function getAdminPassword(): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env.CMS_ADMIN_PASSWORD as string | undefined;
  } catch {
    return process.env.CMS_ADMIN_PASSWORD;
  }
}

# SD Media — Cloudflare Workers + CMS

This version keeps the original Next.js/React design and adds a Cloudflare Workers deployment layer plus a small CMS.

## Cloudflare resources

Create a D1 database named `sdmedia-content`, then replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.jsonc` with its ID. Apply `migrations/0001_content.sql`.

Set the Worker secret `CMS_ADMIN_PASSWORD`.

## GitHub → Workers Builds

Build command:
`npm run build`

Deploy command:
`npx wrangler deploy`

The project uses the OpenNext Cloudflare adapter. Cloudflare's current documentation recommends vinext for new Next.js Workers projects; OpenNext remains documented for maintaining an existing Next.js application. This package uses OpenNext to minimize changes to the original application.

## Routes

- `/ar` Arabic home
- `/en` English home
- `/ar/about` Arabic about
- `/en/about` English about
- `/admin` CMS login/dashboard
- `/api/content` public GET API and authenticated PUT API
- `/api/admin/login` CMS login
- `/api/admin/logout` CMS logout

## Important

Without D1 configured, the website API returns fallback content from `data/content.json`, which makes the project easier to inspect before Cloudflare setup. CMS saves require D1.

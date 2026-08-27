# CMS quick guide

Open `/admin` on the deployed Worker. Enter the value stored in the `CMS_ADMIN_PASSWORD` Worker secret.

The dashboard edits company data, home content, about content, services, statistics, social links, and contact details in Arabic and English.

Click **حفظ التغييرات**. The dashboard sends the new JSON to `PUT /api/content`. The API verifies the signed CMS session and writes the content to Cloudflare D1.

The public website requests `GET /api/content` and updates its content from that API. A fallback JSON file is included so the project still renders before D1 is initialized.

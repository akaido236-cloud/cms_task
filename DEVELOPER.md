SD Media - Developer Documentation
Tech Stack
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS
Animations: Framer Motion
i18n: next-intl
Language: TypeScript
Project Architecture
The project uses the Next.js App Router.

src/app/[locale]/: Handles multilingual routing.
src/components/: Contains all React UI components.
messages/: Contains i18n translation JSON files.
Commit Strategy
Follow Conventional Commits:

feat: A new feature (e.g., feat: add hero section animation)
fix: A bug fix (e.g., fix: resolve arabic RTL issue)
docs: Documentation changes (e.g., docs: add developer guide)
style: Styling changes (e.g., style: update gold color hex)
Local Development Setup
npm install
npm run dev
Visit http://localhost:3000/
SEO Implementation Details
Next.js Metadata API is used in layout.tsx for global tags.
OG Image is set to the SD Media logo URL.
Semantic HTML tags (<header>, <section>, <main>) are used properly.

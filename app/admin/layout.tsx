import type { Metadata } from 'next';
import '../[locale]/globals.css';

export const metadata: Metadata = {
  title: 'SD Media CMS - Admin',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}

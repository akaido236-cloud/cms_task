import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ApiContentProvider } from '@/components/ApiContentProvider';
import { getFallbackContent } from '@/lib/content'; 
import "./globals.css";

export const metadata: Metadata = {
  title: 'SD Media | About Us - Digital Marketing & Web Design Agency',
  description: 'SD Media is a premier digital agency specializing in marketing, content writing, website design, and video editing. Discover our story, vision, and team.',
  keywords: "SD Media, Digital Agency, Marketing, Web Design, Video Editing, Content Writing, Digital Agency MENA",
  openGraph: {
    title: 'SD Media | About Us',
    description: 'Crafting Digital Brilliance. Learn more about our digital agency.',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'SD Media Logo',
      }
    ],
  },
}

// Fix: params is now a Promise and must be awaited
export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const messages = await getMessages();
  
  return (
    // Added dir attribute to handle RTL for Arabic
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        <NextIntlClientProvider messages={messages}>
          <ApiContentProvider initialContent={getFallbackContent()}>
            <Header />
            <main>{children}</main>
            <Footer />
          </ApiContentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
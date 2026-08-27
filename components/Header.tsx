'use client';
import { Link } from '@/i18n/navigation'; // Use next-intl's Link
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale(); // Gets 'en' or 'ar'
  const router = useRouter();
  const pathname = usePathname();

  // Function to switch language
  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    // This replaces the current URL with the new locale, keeping the same path
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.jpeg" 
            alt="SD Media Logo" 
            width={50} 
            height={50} 
            className="rounded-full"
          />
          <span className="text-xl font-bold text-[#D4AF37]">SD Media</span>
        </Link>
        
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 text-sm font-medium text-[#C0C0C0]">
            <li><Link href="/" className="hover:text-[#D4AF37] transition">{t('home')}</Link></li>
            <li><Link href="/about" className="text-[#D4AF37]">{t('about')}</Link></li>
            
          </ul>

          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 border border-[#C0C0C0]/50 text-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-black rounded-full text-sm font-bold transition-all duration-300"
            aria-label="Toggle Language"
          >
            {locale === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </nav>
    </header>
  );
}
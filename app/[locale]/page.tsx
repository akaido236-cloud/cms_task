'use client';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useApiContent } from '@/components/ApiContentProvider';
import { motion } from 'framer-motion';

function HomeContent() {
  const t = useTranslations('Home');
  const locale = useLocale() as 'ar' | 'en';
  const content = useApiContent();
  const home = content.home[locale];
  
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* Rotating Logo Ball Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-10 relative"
      >
        {/* Glowing Halo Ring (Static) */}
        <div className="absolute inset-0 rounded-full bg-[#D4AF37]/30 blur-2xl scale-110"></div>
        
        {/* Rotating Image */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 12 // 12 seconds per full rotation
          }}
          className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)]"
        >
          <Image 
            src="/logo.jpeg" 
            alt="SD Media Logo" 
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] bg-clip-text text-transparent mb-6"
      >
        {home.title}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-2xl text-lg text-[#C0C0C0] mb-10"
      >
        {home.subtitle}
      </motion.p>

      <Link 
        href="/about" 
        className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
      >
        {home.cta}
      </Link>
    </div>
  );
}
export default function HomePage() { return <HomeContent />; }

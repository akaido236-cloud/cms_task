'use client';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useApiContent } from '@/components/ApiContentProvider';

// Framer Motion Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export function HeroSection() {
  const locale = useLocale() as 'ar' | 'en';
  const { about } = useApiContent();
  const t = about[locale];
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1a1a] to-black opacity-90" />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 px-6"
      >
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] bg-clip-text text-transparent mb-6">
          {t.heroTitle}
        </motion.h1>
        <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-lg text-[#C0C0C0]">
          {t.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}

export function StorySection() {
  const locale = useLocale() as 'ar' | 'en';
  const { about } = useApiContent();
  const t = about[locale];
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        variants={fadeUp}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="border-l-2 border-[#D4AF37] pl-6">
          <h2 className="text-4xl font-bold text-[#D4AF37] mb-4">{t.storyTitle}</h2>
          <p className="text-[#C0C0C0] leading-relaxed">{t.storyContent}</p>
        </div>
        
        {/* Updated Image Container */}
        <div className="relative bg-[#1a1a1a] h-64 md:h-80 rounded-lg shadow-2xl border border-[#D4AF37]/20 overflow-hidden">
          <Image 
            src="/conpany.jpeg" 
            alt="SD Media Company" 
            fill
            className="object-cover" 
          />
        </div>
      </motion.div>
    </section>
  );
}

export function VisionMissionSection() {
  const locale = useLocale() as 'ar' | 'en';
  const { about } = useApiContent();
  const t = about[locale];
  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 border border-[#D4AF37]/30 rounded-lg bg-black hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-bold text-[#D4AF37] mb-4">{t.visionTitle}</h3>
          <p className="text-[#C0C0C0]">{t.visionContent}</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 border border-[#C0C0C0]/30 rounded-lg bg-black hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-bold text-[#C0C0C0] mb-4">{t.missionTitle}</h3>
          <p className="text-[#C0C0C0]">{t.missionContent}</p>
        </motion.div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  const locale = useLocale() as 'ar' | 'en';
  const { about, capabilities } = useApiContent();
  const t = about[locale];
  const items = capabilities[locale];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-[#D4AF37] mb-12">{t.capabilitiesTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((cap, i) => (
          <motion.div 
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="p-6 bg-[#1a1a1a] rounded-lg hover:border-[#D4AF37] border border-transparent transition-all duration-300"
          >
            <h4 className="text-xl font-bold text-white mb-2">{cap.title}</h4>
            <p className="text-gray-400 text-sm">{cap.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function StatsSection() {
  const locale = useLocale() as 'ar' | 'en';
  const { stats } = useApiContent();
  const items = stats[locale];

  return (
    <section className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-5xl font-extrabold text-[#D4AF37] mb-2">{stat.num}</h3>
            <p className="text-[#C0C0C0]">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  const locale = useLocale() as 'ar' | 'en';
  const { about } = useApiContent();
  const t = about[locale];
  return (
    <section className="py-24 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.ctaTitle}</h2>
        <button className="px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C0C0C0] text-black font-bold rounded-full hover:scale-110 transition-transform duration-300">
          {t.ctaButton}
        </button>
      </motion.div>
    </section>
  );
}
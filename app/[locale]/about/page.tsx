// app/[locale]/about/page.tsx
import { HeroSection, StorySection, VisionMissionSection, CapabilitiesSection, StatsSection, CTASection } from '@/components/AboutComponents';

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <HeroSection />
      <StorySection />
      <VisionMissionSection />
      <CapabilitiesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
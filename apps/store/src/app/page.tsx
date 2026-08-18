import { PromoBar } from '@/components/home/PromoBar';
import { HeroSection } from '@/components/home/HeroSection';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { FlashboyLegacySection } from '@/components/home/FlashboyLegacySection';
import { RashGuardsSection } from '@/components/home/RashGuardsSection';
import { KimonosTeaserSection } from '@/components/home/KimonosTeaserSection';
import { SiteFooter } from '@/components/home/SiteFooter';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF]">
      <PromoBar />
      <HeroSection />
      <PhilosophySection />
      <BrandStorySection />
      <FlashboyLegacySection />
      <RashGuardsSection />
      <KimonosTeaserSection />
      <SiteFooter />
    </div>
  );
}

import { HeroSection } from '@/components/home/hero-section';
import { FeaturedSites } from '@/components/home/featured-sites';
import { HowItWorks } from '@/components/home/how-it-works';
import { StatsSection } from '@/components/home/stats-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSites />
      <HowItWorks />
      <StatsSection />
    </>
  );
}

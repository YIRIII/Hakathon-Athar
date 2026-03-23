import { HeroSection } from '@/components/home/hero-section';
import { FeaturedSites } from '@/components/home/featured-sites';
import { IslamicStarDivider } from '@/components/home/islamic-star-divider';
import { HeritageTimeline } from '@/components/home/heritage-timeline';
import { HowItWorks } from '@/components/home/how-it-works';
import { StatsSection } from '@/components/home/stats-section';
import { HomeChatWidget } from '@/components/home/home-chat-widget';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSites />
      <IslamicStarDivider />
      <HeritageTimeline />
      <HowItWorks />
      <StatsSection />
      <HomeChatWidget />
    </>
  );
}

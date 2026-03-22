'use client';

import { useSearchParams } from 'next/navigation';
import { HeritageMap } from '@/components/map/heritage-map';

export default function MapPage() {
  const searchParams = useSearchParams();
  const focusSiteId = searchParams.get('site') || undefined;

  return <HeritageMap focusSiteId={focusSiteId} />;
}

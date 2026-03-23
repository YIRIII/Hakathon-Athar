'use client';

import { useSearchParams } from 'next/navigation';
import { HeritageMap } from '@/components/map/heritage-map';

export default function MapPage() {
  const searchParams = useSearchParams();
  const focusSiteId = searchParams.get('site') || undefined;

  return (
    <div className="pb-16 md:pb-0">
      <HeritageMap focusSiteId={focusSiteId} />
    </div>
  );
}

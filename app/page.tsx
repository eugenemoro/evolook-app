import { getAllLooks } from '@/lib/actions/getLooks';
import HowItWorks from '@/components/ui/HowItWorks';
import SegmentFilter from '@/components/ui/SegmentFilter';
import Skeleton from '@/components/ui/Skeleton';
import { Suspense } from 'react';
import LooksGrid from '@/components/LookGrid';

interface Props {
  searchParams: {
    segment?: 'luxury' | 'mid' | 'economy';
  };
}

export default async function HomePage({ searchParams }: Props) {
  const segment = await searchParams?.segment;
  const looksPromise = getAllLooks(segment);

  return (
    <main className="min-h-screen bg-white px-4 md:px-12 py-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
          Discover AI-Powered Fashion Looks
        </h1>
      </header>

      <HowItWorks />

      <div className="mt-12">
        <SegmentFilter withReset />
        <Suspense fallback={<Skeleton count={8} />}>
          {' '}
          <LooksGrid promise={looksPromise} />
        </Suspense>
      </div>
    </main>
  );
}

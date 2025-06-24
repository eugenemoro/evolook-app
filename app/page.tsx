import { getAllLooks } from '@/lib/actions/getLooks';
import Link from 'next/link';
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
  const segment = searchParams?.segment;
  const looksPromise = getAllLooks(segment);

  return (
    <main className="min-h-screen bg-white px-4 md:px-12 py-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
          Discover AI-Powered Fashion Looks
        </h1>
        <div className="flex gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-black text-white text-sm font-medium shadow hover:shadow-md hover:bg-neutral-800 active:scale-95 transition-all duration-200"
          >
            + Generate Look
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all duration-200"
          >
            My Account
          </Link>
        </div>
      </header>

      <SegmentFilter />
      <HowItWorks />

      <div className="mt-12">
        <Suspense fallback={<Skeleton count={8} />}>
          {' '}
          {/* optional skeleton loader */}
          {/* @ts-expect-error Async Server Component */}
          <LooksGrid promise={looksPromise} />
        </Suspense>
      </div>
    </main>
  );
}

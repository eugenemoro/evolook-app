import Link from 'next/link';
import { getAllLooks, getLooksBySegment } from '@/lib/actions/getLooks';
import { LookClient } from '@/types/Look';

interface Props {
  searchParams: {
    segment?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const selected = searchParams.segment as
    | 'luxury'
    | 'mid'
    | 'economy'
    | undefined;

  const looks: LookClient[] = selected
    ? await getLooksBySegment(selected)
    : await getAllLooks();

  const segments = ['luxury', 'mid', 'economy'] as const;

  return (
    <main className="min-h-screen bg-white px-4 md:px-12 py-8">
      {/* Header */}
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

      {/* Filter */}
      <section className="mb-12 flex flex-wrap gap-3">
        <span className="text-sm font-medium text-neutral-700 pt-1">
          Filter by:
        </span>
        {segments.map((segment) => (
          <Link
            key={segment}
            href={segment === selected ? '/' : `/?segment=${segment}`}
            className={`px-4 py-1.5 rounded-full text-sm border ${
              selected === segment
                ? 'bg-black text-white border-black'
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
            } transition-all`}
          >
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
        ))}
      </section>

      {/* Looks */}
      <section>
        {looks.length === 0 ? (
          <p className="text-neutral-500 text-lg">
            No looks found for this segment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {looks.map((look) => (
              <Link href={`/look/${look._id}`} key={look._id} className="group">
                <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition">
                  <img
                    src={look.imageUrl}
                    alt={look.title}
                    className="w-full h-80 object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h2 className="text-base font-semibold text-neutral-800">
                      {look.title}
                    </h2>
                    <p className="text-xs text-neutral-500">{look.brand}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

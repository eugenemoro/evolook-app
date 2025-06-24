import { getAllLooks } from '@/lib/actions/getLooks';
import Link from 'next/link';

interface Props {
  searchParams: {
    segment?: 'luxury' | 'mid' | 'economy';
  };
}

export default async function HomePage({ searchParams }: Props) {
  const segment = searchParams?.segment;
  const looks = await getAllLooks(segment);

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

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-lg font-medium mb-2">Upload your photo</h3>
            <p className="text-sm text-neutral-600">
              And add your body measurements
            </p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-medium mb-2">Define your style</h3>
            <p className="text-sm text-neutral-600">
              Describe it or upload a reference look
            </p>
          </div>
          <div className="p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
            <div className="text-4xl mb-4">🛍️</div>
            <h3 className="text-lg font-medium mb-2">Get styled</h3>
            <p className="text-sm text-neutral-600">
              Browse and shop AI-generated outfits
            </p>
          </div>
        </div>
      </section>

      {looks.length === 0 ? (
        <p className="text-neutral-500 text-lg mt-12">
          No looks yet — try generating your first one!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12">
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
    </main>
  );
}

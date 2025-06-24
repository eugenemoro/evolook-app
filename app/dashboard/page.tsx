import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SegmentFilter from '@/components/ui/SegmentFilter';
import LooksGrid from '@/components/LookGrid';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { getLooksByUser } from '@/lib/actions/getLooksByUser';

interface Props {
  searchParams?: {
    segment?: 'luxury' | 'mid' | 'economy';
  };
}

export default async function DashboardPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/signin');
  }

  const segment = searchParams?.segment;
  const looks = await getLooksByUser(session.user.email, segment);

  return (
    <main className="min-h-screen bg-white px-4 md:px-12 py-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
          My Looks
        </h1>
      </header>

      <SegmentFilter pathname="/dashboard" withReset />

      {looks.length === 0 ? (
        <p className="text-neutral-500 text-lg mt-12">
          You haven&apos;t generated any looks yet.
        </p>
      ) : (
        <div className="mt-12">
          <LooksGrid promise={Promise.resolve(looks)} withDelete />
        </div>
      )}
    </main>
  );
}

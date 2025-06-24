'use client';

import { LookDb } from '@/types/Look';
import { useEffect, useState } from 'react';
import LookCard from './ui/LookCard';

interface Props {
  promise: Promise<LookDb[]>;
  withDelete?: boolean;
}

export default function LooksGrid({ promise, withDelete }: Props) {
  const [looks, setLooks] = useState<LookDb[] | null>(null);

  useEffect(() => {
    promise.then((data) => setLooks(data));
  }, [promise]);

  if (!looks) {
    return <p className="text-neutral-400 text-sm">Loading...</p>;
  }

  if (looks.length === 0) {
    return (
      <p className="text-neutral-500 text-lg mt-12">
        No looks yet — try generating your first one!
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12">
      {looks.map((look) => (
        <LookCard
          key={look._id}
          id={look._id}
          title={look.title}
          imageUrl={look.imageUrl}
          brand={look.brand}
          withDelete={withDelete}
        />
      ))}
    </div>
  );
}

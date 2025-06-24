'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  brand: string;
  withDelete?: boolean;
}

export default function LookCard({
  id,
  title,
  imageUrl,
  brand,
  withDelete,
}: Props) {
  const router = useRouter();

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = confirm('Delete this look?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/look/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh(); // обновим список
      } else {
        alert('Failed to delete look');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <Link href={`/look/${id}`} className="group relative">
      <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-80 object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="p-4">
          <h2 className="text-base font-semibold text-neutral-800">{title}</h2>
          <p className="text-xs text-neutral-500">{brand}</p>
        </div>
      </div>

      {withDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-white border border-neutral-300 text-neutral-500 hover:text-red-600 hover:border-red-400 rounded-full px-2 py-1 text-xs shadow-sm transition"
        >
          🗑
        </button>
      )}
    </Link>
  );
}

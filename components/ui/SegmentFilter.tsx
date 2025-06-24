'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const segments = ['luxury', 'mid', 'economy'] as const;

interface Props {
  pathname?: string;
  withReset?: boolean;
}

export default function SegmentFilter({ pathname, withReset }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPath = pathname || usePathname();
  const selected = searchParams.get('segment');

  const onSelect = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('segment', value);
      } else {
        params.delete('segment');
      }

      const query = params.toString();
      const fullPath = query ? `${urlPath}?${query}` : urlPath;

      router.push(fullPath);
    },
    [searchParams, urlPath, router]
  );

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {segments.map((segment) => (
        <button
          key={segment}
          className={`px-4 py-2 text-sm rounded-full border transition ${
            selected === segment
              ? 'bg-black text-white border-black'
              : 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
          }`}
          onClick={() => onSelect(segment)}
        >
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </button>
      ))}

      {withReset && selected && (
        <button
          onClick={() => onSelect(null)}
          className="ml-2 text-sm text-neutral-500 underline hover:text-neutral-800 transition"
        >
          Reset
        </button>
      )}
    </div>
  );
}

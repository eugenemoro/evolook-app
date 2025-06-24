'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface Props {
  session: Session | null;
}

export default function Navbar({ session }: Props) {
  return (
    <nav className="flex items-center justify-between px-4 md:px-12 py-4 border-b border-neutral-200 bg-white">
      <Link href="/" className="text-xl font-bold text-black hover:opacity-80">
        Evolook
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/generate"
          className="text-sm px-4 py-2 rounded-full bg-black text-white hover:bg-neutral-800 transition"
        >
          + Generate
        </Link>

        {session?.user?.email ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sm px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition"
            >
              Sign Out
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
}

'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow border border-neutral-200 text-center">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Sign in with your Google account to access your dashboard.
        </p>
        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="w-full py-3 px-4 rounded-lg bg-black text-white text-sm font-medium hover:bg-neutral-800 active:scale-95 transition"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}

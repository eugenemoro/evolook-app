'use client';
import React from 'react';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm text-neutral-700 hover:underline"
    >
      Sign out
    </button>
  );
}

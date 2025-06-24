'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateLook } from '@/lib/actions/generateLook';

export default function GeneratePage() {
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [segment, setSegment] = useState<'luxury' | 'mid' | 'economy'>('mid');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const look = await generateLook();
      router.push(`/look/${look._id}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 flex items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 p-6 rounded-xl border border-neutral-200 shadow-sm"
      >
        <h1 className="text-2xl font-semibold text-neutral-900">
          Create New Look
        </h1>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Segment
          </label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as any)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2"
          >
            <option value="luxury">Luxury</option>
            <option value="mid">Mid</option>
            <option value="economy">Economy</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            placeholder="https://..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2"
            required
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-48 object-cover mt-4 rounded-lg border"
            />
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-full hover:bg-neutral-800 transition-all"
        >
          {isLoading ? 'Generating...' : 'Generate Look'}
        </button>
      </form>
    </main>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GeneratePage() {
  const [mode, setMode] = useState<'prompt' | 'image'>('prompt');
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    if (mode === 'prompt') {
      formData.append('prompt', prompt);
    } else if (image) {
      formData.append('image', image);
    }

    const res = await fetch('/api/generate', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data.imageUrl);
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Generate a Look</h1>

      {/* Mode toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('prompt')}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            mode === 'prompt'
              ? 'bg-black text-white'
              : 'bg-white text-neutral-700'
          } transition`}
        >
          Text Prompt
        </button>
        <button
          onClick={() => setMode('image')}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            mode === 'image'
              ? 'bg-black text-white'
              : 'bg-white text-neutral-700'
          } transition`}
        >
          Reference Image
        </button>
      </div>

      {/* Input */}
      {mode === 'prompt' ? (
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full border border-neutral-300 rounded-xl p-4 text-sm"
          placeholder="Describe your ideal look..."
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="text-sm"
        />
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <Image
            src={result}
            alt="Generated Look"
            width={512}
            height={512}
            className="rounded-xl shadow"
          />
        </div>
      )}
    </main>
  );
}

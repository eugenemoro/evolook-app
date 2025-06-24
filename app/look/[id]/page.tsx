import { notFound } from 'next/navigation';
import { getLookById } from '@/lib/actions/getLooks';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

export default async function LookPage({ params }: Props) {
  const { id } = await params;
  const look = await getLookById(id);
  if (!look) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 animate-fadeIn">
      {/* Заголовок + кнопка */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{look.title}</h1>
          <p className="text-sm text-neutral-500">{look.brand}</p>
        </div>
        <Link
          href={`/share/${look._id}`}
          className="px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-neutral-800 active:scale-95 transition-all"
        >
          Share Look
        </Link>
      </div>

      {/* Картинка */}
      <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm mb-6">
        <Image
          src={look.imageUrl}
          alt={look.title}
          width={1024}
          height={1024}
          className="w-full object-cover"
        />
      </div>

      {/* Элементы костюма */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Outfit Details</h2>
        <ul className="space-y-4">
          {look.items?.map((item, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4"
            >
              <div className="mb-1 sm:mb-0">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-neutral-500">
                  {item.brand} · {item.type}
                </p>
              </div>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline hover:text-blue-700 transition"
              >
                Shop →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

import Link from 'next/link';
interface Props {
  id: string;
  title: string;
  imageUrl: string;
  brand: string;
}
export default function LookCard({ id, title, imageUrl, brand }: Props) {
  return (
    <Link href={`/look/${id}`} className="group">
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
    </Link>
  );
}

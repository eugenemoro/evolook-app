interface Props {
  title: string;
  imageUrl: string;
  brand: string;
}
export default function LookCard({ title, imageUrl, brand }: Props) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md w-64">
      <img src={imageUrl} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{brand}</p>
      </div>
    </div>
  );
}

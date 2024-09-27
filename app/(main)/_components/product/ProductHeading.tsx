export function ProductHeading({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-medium text-gray-900">{name}</h1>
      <p className="text-xl font-medium text-gray-900">$ {price}</p>
    </div>
  );
}

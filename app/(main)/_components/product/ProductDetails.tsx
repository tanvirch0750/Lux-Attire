export function ProductDetails({ description }: { description: string }) {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium text-gray-900">Description</h2>

      <div
        className="prose prose-sm mt-4 text-gray-500"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}

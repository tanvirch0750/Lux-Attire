export default function CartChekcout() {
  return (
    <div className=" mt-auto">
      <div className="space-y-1 text-right">
        <p className=" text-xl">
          Total amount:
          <span className="font-semibold pl-3">357 €</span>
        </p>
        <p className="text-sm dark:text-gray-600">
          Not including taxes and shipping costs
        </p>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          className="px-6 py-2 border rounded-md bg-primary text-white"
        >
          Back
          <span className="sr-only sm:not-sr-only">to shop</span>
        </button>
        <button
          type="button"
          className="px-6 py-2 border rounded-md bg-brand text-white"
        >
          <span className="sr-only sm:not-sr-only">Continue to</span> Checkout
        </button>
      </div>
    </div>
  );
}

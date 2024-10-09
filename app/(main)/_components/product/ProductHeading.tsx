import { IOffer } from '@/db/models/product-model';
import { ProductDetailReviews, ReviewStats } from './ProductDetailReviews';

export function ProductHeading({
  name,
  price,
  offers,
  reviewDetails,
}: {
  name: string;
  price: number;
  offers: IOffer[];
  reviewDetails: ReviewStats;
}) {
  const currentDate = new Date();
  const activeOffers = offers.filter(
    (offer) => offer.isActive && new Date(offer.validUntil) > currentDate
  );

  const discountOffer = activeOffers.find(
    (offer) => offer.offerType === 'discount'
  );

  const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ) => {
    return originalPrice - (originalPrice * discountPercentage) / 100;
  };

  const discountedPrice = discountOffer
    ? // @ts-ignore
      calculateDiscountedPrice(price, parseFloat(discountOffer.value))
    : null;

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
        <ProductDetailReviews reviewDetails={reviewDetails} />
      </div>
      <div className="flex flex-col items-end">
        {discountedPrice ? (
          <>
            <span className="text-2xl font-bold text-brand">
              ${discountedPrice.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        )}
        {discountOffer && (
          <span className="text-sm font-medium text-brand-600  inline-flex  items-center justify-center  text-orange-700  bg-orange-100  px-2  py-1  rounded-full">
            {discountOffer.value}% OFF
          </span>
        )}
      </div>
    </div>
  );
}

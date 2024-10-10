'use client';

import { TProduct } from '@/db/models/product-model';
import Image from 'next/image';
import Link from 'next/link';
import AddToWishListButton from '../wishlist/AddToWishListButton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Clock, Truck, ArrowRight, Star } from 'lucide-react';

export default function ProductCard({ product }: { product: TProduct }) {
  const wishListData = {
    productId: product?._id as string,
    name: product?.name,
    price: product?.price,
    image: product?.images.filter((image) => image.primary)[0].imageSrc,
    category: product?.category?.label,
  };

  const currentDate = new Date();
  const activeOffers =
    product.offers?.filter(
      (offer) => offer.isActive && new Date(offer.validUntil) > currentDate
    ) || [];

  const discountOffer = activeOffers.find(
    (offer) => offer.offerType === 'discount'
  );
  const shippingOffer = activeOffers.find(
    (offer) => offer.offerType === 'freeShipping'
  );

  const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ) => {
    return originalPrice - (originalPrice * discountPercentage) / 100;
  };

  const discountedPrice = discountOffer
    ? //  @ts-ignore
      calculateDiscountedPrice(product.price, parseFloat(discountOffer.value))
    : null;

  const renderStarRating = (rating: number, totalReviews: number) => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating.toFixed(1)}
          </span>
        </div>
        {/* <span className="text-sm text-gray-600">
          total reviews - {totalReviews}
        </span> */}
      </div>
    );
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <Link href={`/products/${product?.category?.value}/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            alt={product?.name}
            src={product?.images.filter((image) => image.primary)[0].imageSrc}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            {discountOffer && (
              <Badge variant="destructive">
                <Tag className="mr-1 h-3 w-3" />
                {discountOffer.value}% OFF
              </Badge>
            )}
            {shippingOffer && (
              <Badge variant="secondary">
                <Truck className="mr-1 h-3 w-3" />
                Free Shipping
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-brand truncate">
          {product?.name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-semibold mr-2">Colors:</span>
            {product?.colors?.map((color) => (
              <span
                key={color.bgColor}
                className="w-4 h-4 rounded-full inline-block mr-1"
                style={{ backgroundColor: color.bgColor }}
                title={color.name}
              />
            ))}
          </div>

          {product?.averageRating != null &&
            product.totalReviews != null &&
            product.averageRating > 0 &&
            product.totalReviews > 0 && (
              <div>
                {renderStarRating(product.averageRating, product.totalReviews)}
              </div>
            )}
        </div>
        {activeOffers.length > 0 && (
          <div className="text-sm text-gray-600 flex items-center mt-3">
            <Clock className="mr-1 h-3 w-3" />
            Offer valid until:{' '}
            {new Date(activeOffers[0].validUntil).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between bg-gray-50 mt-auto">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            {discountedPrice ? (
              <>
                <span className="font-bold text-lg text-brand">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product?.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-gray-900">
                ${product?.price.toFixed(2)}
              </span>
            )}
          </div>
          <Link href={`/products/${product?.category?.value}/${product._id}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-brand hover:bg-brand hover:text-white transition-colors"
            >
              See Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <AddToWishListButton product={wishListData} isHidden={false} />
      </CardFooter>
    </Card>
  );
}

'use client';

import { TProduct } from '@/db/models/product-model';
import Image from 'next/image';
import Link from 'next/link';
import AddToWishListButton from '../wishlist/AddToWishListButton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tag,
  Clock,
  Truck,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { CarouselApi } from '@/components/ui/carousel';
import { isOfferDateValidUntil } from '@/lib/utils';

export default function ProductCard({ product }: { product: TProduct }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState<boolean[]>(
    product.images.map(() => true)
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleImageLoad = (index: number) => {
    setLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const wishListData = {
    productId: product?._id as string,
    name: product?.name,
    price: product?.price,
    image: product?.images.filter((image) => image.primary)[0].imageSrc,
    category: product?.category?.label,
  };

  const activeOffers =
    product.offers?.filter((offer) => {
      return offer.isActive && isOfferDateValidUntil(offer.validUntil);
    }) || [];

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
    ? // @ts-ignore
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
      </div>
    );
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden">
        <Carousel setApi={setApi} className="w-full h-full">
          <CarouselContent>
            {product?.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square w-full h-full">
                  {loading[index] && (
                    <Skeleton className="w-full h-full absolute inset-0" />
                  )}
                  <Image
                    alt={`${product?.name} - Image ${index + 1}`}
                    src={image.imageSrc}
                    layout="fill"
                    objectFit="cover"
                    className={`transition-transform duration-300 group-hover:scale-110 ${
                      loading[index] ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-2 left-2 right-2 z-10 flex justify-between items-center">
            <Badge variant="secondary" aria-live="polite">
              {current} / {count}
            </Badge>
            <div className="flex gap-1">
              <CarouselPrevious className="relative bg-white/70 hover:bg-white/80 w-6 h-6 rounded-full !top-[12px] left-[-15px]">
                <ChevronLeft className="h-3 w-3 text-white" />
                <span className="sr-only">Previous image</span>
              </CarouselPrevious>
              <CarouselNext className="relative bg-white/70 hover:bg-white/80 w-6 h-6 rounded-full !top-[12px] right-[5px]">
                <ChevronRight className="h-3 w-3 text-white" />
                <span className="sr-only">Next image</span>
              </CarouselNext>
            </div>
          </div>
        </Carousel>
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
      <CardContent className="p-4 flex-grow flex flex-col gap-3">
        <Link href={`/products/${product?.category?.value}/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-brand truncate">
            {product?.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-1">
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
          <div className="text-sm text-gray-600 flex items-center mt-1">
            <Clock className="mr-1 h-3 w-3" />
            Offer valid until:{' '}
            {new Date(activeOffers[0].validUntil).toLocaleDateString()}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between bg-gray-50 mt-auto">
        <div className="flex w-full items-center justify-between space-x-4">
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
          <AddToWishListButton product={wishListData} isHidden={false} />
        </div>
      </CardFooter>
    </Card>
  );
}

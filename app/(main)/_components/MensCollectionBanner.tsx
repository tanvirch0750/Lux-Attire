/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Img from '@/assests/man-with-camera-yellow-scene.jpg';
import Link from 'next/link';

export default function MensCollectionBanner() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen mb-20">
      <div className="md:w-1/2 bg-yellow-100 p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Elevate Your Style with Luxe Men's Collection
        </h1>
        <p className="text-gray-700 mb-6">
          Discover timeless pieces designed for the modern man. From tailored
          suits to casual wear, our collection blends comfort with
          sophistication to ensure you stand out on every occasion. Explore the
          latest trends and redefine your wardrobe with Luxe Attire's premium
          men's fashion.
        </p>
        <Link href="/products/mens-collection">
          <Button className="bg-brand hover:bg-brand/90 w-fit py-2">
            VIEW MENS COLLECTION
          </Button>
        </Link>
      </div>
      <div className="md:w-1/2 relative">
        <Image
          src={Img}
          alt="Model wearing slim-fit stretch cotton poplin shirt"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
}

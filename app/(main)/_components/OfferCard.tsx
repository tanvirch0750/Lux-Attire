import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Img1 from '@/assests/offer-img-two.jpg';
import Img2 from '@/assests/offer-img-one.jpeg';
import Link from 'next/link';

export default function OfferAndFreeShippingBanner() {
  return (
    <div className="flex flex-col md:flex-row w-full md:h-screen">
      {/* Left Banner */}
      <div className="relative w-full md:w-1/2 bg-[#fce4e4] p-6 md:p-0 overflow-hidden">
        <Image
          src={Img1}
          alt="Two women in summer outfits"
          width={960}
          height={400}
          className="w-full h-[300px] md:h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 rounded-full w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex flex-col items-center justify-center p-4 md:p-8">
            <p className="text-sm md:text-md font-semibold text-brand mb-2">
              SALE UP TO 50% OFF
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center leading-tight">
              SUMMER
              <br />
              2024
            </h2>
            <Link href="/products/discount-products">
              <Button
                variant="outline"
                className="rounded-full px-4 md:px-6 bg-primary text-white hover:bg-primary/90 hover:text-white"
              >
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Banner */}
      <div className="relative w-full md:w-1/2 bg-pink-200 p-6 md:p-0 overflow-hidden">
        <Image
          src={Img2}
          alt="Man and woman in stylish summer clothing"
          width={960}
          height={400}
          className="w-full h-[300px] md:h-full object-cover object-right"
        />
        <div className="absolute inset-0 flex flex-col justify-start p-4 md:p-8">
          <div>
            <p className="text-xs md:text-sm font-semibold text-gray-800 mb-2">
              FREE SHIPPING ON SELECT ITEMS
            </p>
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              DISCOVER PRODUCTS
              <br />
              WITH FREE SHIPPING
            </h2>
            <Link href="/products/free-shipping-products">
              <Button
                variant="outline"
                className="rounded-full px-4 md:px-6 bg-primary text-white hover:bg-primary/90 hover:text-white"
              >
                SHOP NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

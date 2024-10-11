import Image from 'next/image';
import React from 'react';
import showcaseOne from '@/assests/showcase-one.jpg';
import showcaseTwo from '@/assests/showcase-two.jpg';
import showcaseThree from '@/assests/showcase-three.jpg';

const ProductsShowcase = () => {
  const products = [
    {
      title: 'New Spring Knits',
      description:
        'Freshen up your wardrobe with vibrant, lightweight knits perfect for sunny spring days.',
      image: showcaseOne,
    },
    {
      title: 'Down To The Core',
      description:
        'Elevate your everyday look with minimalist designs that bring out your inner confidence.',
      image: showcaseTwo,
    },
    {
      title: 'New Winter Knits',
      description:
        'Stay cozy and stylish with our warm, intricate knits perfect for those chilly winter evenings.',
      image: showcaseThree,
    },
  ];

  return (
    <div className="m-[24px] py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className={`flash-effect border md:border-0 p-6 md:p-0  text-center flex flex-col justify-center items-center animate-fade-slide ${
              index % 2 === 0 ? 'fade-slide-left' : 'fade-slide-right'
            }`}
          >
            {index % 2 === 0 ? (
              <>
                {/* Image First for odd index */}
                <div className="overflow-hidden rounded-lg shadow-lg mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={1000}
                    height={400}
                    quality={100}
                    objectFit="contain"
                    className="w-full object-cover h-[400px] transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold">{product.title}</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </>
            ) : (
              <>
                {/* Text First for even index */}
                <h3 className="text-xl font-bold">{product.title}</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
                <div className="overflow-hidden rounded-lg shadow-lg mt-6">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={1000}
                    height={400}
                    quality={100}
                    objectFit="contain"
                    className="w-full object-cover h-[400px] transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsShowcase;

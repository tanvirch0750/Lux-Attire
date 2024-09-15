import Image from 'next/image';
import React from 'react';

const TopBrands = () => {
  const brands = [
    {
      name: 'Club Shoes',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fclub-shoes.png&w=384&q=100',
    },
    {
      name: 'Hoppister',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fhoppister.png&w=384&q=100',
    },
    {
      name: 'Blaze Fashion',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fblaze-fashion.png&w=384&q=100',
    },
    {
      name: 'Elegance',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Felegance.png&w=384&q=100',
    },
    {
      name: 'Fashadil',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Ffashadil.png&w=384&q=100',
    },
    {
      name: 'Shovia',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fshovia.png&w=384&q=100',
    },
    {
      name: 'Fusion',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Ffusion.png&w=384&q=100',
    },
    {
      name: 'Hunter Shoes',
      logo: 'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbrands%2Fhunter-shoes.png&w=384&q=100',
    },
  ];

  const features = [
    {
      icon: 'https://cdn-icons-png.freepik.com/256/2127/2127117.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: 'Guaranteed Savings',
      description:
        "If you don't make your membership fee in savings, we'll refund the difference.",
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/10645/10645904.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: 'Try it risk-free',
      description:
        "If you don't make your membership fee in savings, we'll refund the difference.",
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/13606/13606863.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: 'Super Fast Delivery',
      description:
        "If you don't make your membership fee in savings, we'll refund the difference.",
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/11744/11744509.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: '1000+ products priced at cost',
      description:
        "If you don't make your membership fee in savings, we'll refund the difference.",
    },
  ];

  return (
    <div className="m-[24px] my-8">
      {/* Top Brands Section */}
      <h2 className="text-2xl font-bold mb-4 ">Why Choose Us</h2>
      {/* <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
        {brands.map((brand, index) => (
          <div key={index} className="flex-shrink-0 w-32 text-center">
            <div className="w-28 h-28 mx-auto bg-gray-100 rounded-md flex items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={1000}
                height={1000}
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="mt-2 text-sm font-semibold">{brand.name}</p>
          </div>
        ))}
      </div> */}

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 bg-gray-100 rounded-lg shadow"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mt-5">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrands;

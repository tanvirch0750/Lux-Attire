import Image from 'next/image';
import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: 'https://cdn-icons-png.freepik.com/256/2127/2127117.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: 'Guaranteed Savings',
      description:
        'Save more than you spend! If your membership fee doesn’t cover your savings, we’ll refund the difference.',
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/10645/10645904.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: 'Try it risk-free',
      description:
        'Experience all the benefits without worry. Not satisfied? Get your full membership fee back, no questions asked.',
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/13606/13606863.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: 'Super Fast Delivery',
      description:
        'Get your products delivered in record time with our reliable and speedy delivery service.',
    },
    {
      icon: 'https://cdn-icons-png.freepik.com/256/11744/11744509.png?uid=R15161155&ga=GA1.2.911219905.1717681244&semt=ais_hybrid',
      title: '1000+ Products Priced at Cost',
      description:
        'Access a vast selection of quality products priced just at cost, helping you maximize savings with every purchase.',
    },
  ];

  return (
    <div className="m-[24px] my-8">
      {/* Top Brands Section */}
      <h2 className="text-2xl font-bold mb-4 ">Why Choose Us</h2>

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

export default WhyChooseUs;

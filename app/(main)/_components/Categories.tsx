import Link from 'next/link';
import React from 'react';

const CategoryGrid = () => {
  return (
    <div className="mx-auto p-6 grid grid-cols-12 gap-2">
      {/* Row 1 */}
      <Link
        href="/products/womens-wear"
        className="col-span-12 md:col-span-6 flash-effect"
      >
        <div
          className="bg-orange-400 relative flex items-center justify-center bg-cover bg-center bg-no-repeat h-[300px]"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/front-view-beautiful-woman-with-copy-space_23-2148342437.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid')",
          }}
        >
          {/* Text aligned to the right without background */}
          <div className="absolute right-0 mr-6 text-right">
            <p className="uppercase text-sm mb-2 text-white">explore</p>
            <h2 className="text-3xl font-bold text-white">
              Women's Collection
            </h2>
            <p className="text-sm mt-2 text-white">#NEWYEAR2024</p>
          </div>
        </div>
      </Link>

      <Link
        href="/products/activewear"
        className="col-span-12 md:col-span-3 flash-effect"
      >
        <div
          className="bg-gray-200 h-[300px] flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/stylish-girl-plaid-coat-posing-orange-wall_197531-23797.jpg?t=st=1726331866~exp=1726335466~hmac=0f76551b400a3020c498b95a7a464c7372d790d5b70320ac1c5e1704ba9a55b3&w=740')",
          }}
        >
          <div className="absolute top-4 right-4 text-right">
            <p className="uppercase text-sm text-gray-100">#New</p>
            <h2 className="text-2xl font-bold text-gray-100">Activewear</h2>
          </div>
        </div>
      </Link>

      <Link
        href="/products/kids-wear"
        className="col-span-12 md:col-span-3 flash-effect"
      >
        <div
          className="bg-red-400 h-[300px] flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/suspicious-kid-yellow-sweater-short-haired-preteen-girl_197531-14380.jpg?t=st=1726332114~exp=1726335714~hmac=67d232d509d5f4b4dbe7f2e067bd417eba839a80f124e3644adfa2ea2ba98176&w=740')",
          }}
        >
          <div className="absolute bottom-4 right-4 text-right p-4">
            <p className="uppercase text-sm text-white">#Dress</p>
            <h2 className="text-2xl font-bold text-white">Kids Wear</h2>
            <p className="text-xs mt-1 text-white">exclusive</p>
          </div>
        </div>
      </Link>

      {/* Row 2 */}
      <Link
        href="/products/accessories"
        className="col-span-12 md:col-span-3 flash-effect"
      >
        <div
          className="bg-teal-400 h-[300px] flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/man-shoes-with-glasses-paper-mustache-table_23-2148080119.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid')",
          }}
        >
          <div className="absolute top-4 left-4 text-left p-4">
            <p className="uppercase text-white">#Accessories</p>
            <h2 className="text-4xl font-bold text-white">25%</h2>
          </div>
        </div>
      </Link>

      <Link
        href="/products/traditional-clothing"
        className="col-span-12 md:col-span-3 flash-effect"
      >
        <div
          className="bg-yellow-400 h-[300px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/portrait-curly-haired-young-man-with-copy-space_23-2148892101.jpg?t=st=1726332299~exp=1726335899~hmac=4589618fe564b323693da5df0299667280100fd2a41d1c1aebbe2d9836a88c3e&w=740')",
          }}
        >
          <div className="text-white text-center mt-12 flex flex-col gap-4 p-4 max-w-[200px]">
            <p className="uppercase text-sm">explore</p>
            <h2 className="text-3xl font-bold">Traditional Clothing</h2>
            <p className="text-sm mt-2">#NEWYEAR2024</p>
          </div>
        </div>
      </Link>

      <Link
        href="/products/menswear"
        className="col-span-12 md:col-span-6 flash-effect"
      >
        <div
          className="bg-rose-400 flex items-center justify-center bg-cover bg-center bg-no-repeat h-[300px]"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/image-tourist-checking-out-something-cool-takeoff-sunglasses-say-wow-looking-aside-impressed_1258-159739.jpg?t=st=1726333836~exp=1726337436~hmac=7b9aa4c9c9c17426878c4f56baa707650fade6b13a6280f11de1d2fc810b7b47&w=996')",
          }}
        >
          <div className="text-white absolute right-8 mr-6">
            <p className="uppercase text-sm">explore</p>
            <h2 className="text-3xl font-bold">Menswear</h2>
            <p className="text-sm mt-2">Mega Sale</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryGrid;

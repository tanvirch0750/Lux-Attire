import React from 'react';
import Image from 'next/image'; // Using Next.js Image component for optimized images

const NewArrivals = () => {
  return (
    <div className="mb-9 md:mb-10 xl:mb-12 mx-auto p-6">
      <div className="flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">
          New Arrivals
        </h3>
      </div>
      <div className="grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 bg-white grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative w-full">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/elegant-female-model-blouse-long-skirt-posing-indoor-shot-fascinating-curly-woman-wears-blue-coat_197531-5183.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px] w-full"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        {/* Add more product cards as needed */}
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/young-woman-red-polka-dot-outfit-with-smile-eyes-closed-posing-yellow-wall_197531-14265.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px]"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4917.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px]"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative w-full">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/elegant-young-handsome-man_1301-5870.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px] w-full"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative w-full">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/elegant-female-model-blouse-long-skirt-posing-indoor-shot-fascinating-curly-woman-wears-blue-coat_197531-5183.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px] w-full"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        {/* Add more product cards as needed */}
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/young-woman-red-polka-dot-outfit-with-smile-eyes-closed-posing-yellow-wall_197531-14265.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px]"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4917.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px]"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
        <div
          className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
          role="button"
          title="Roadster Women Round Neck"
        >
          <div className="flex mb-3 md:mb-3.5 relative w-full">
            <Image
              alt="Roadster Women Round Neck"
              src="https://img.freepik.com/free-photo/elegant-young-handsome-man_1301-5870.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              width={750}
              height={750}
              className="bg-gray-300 object-cover rounded-s-md transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px] w-full"
            />
          </div>
          <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
            <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading">
              Roadster Women Round Neck
            </h2>
            <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
              Fendi began life in 1925 as a fur and leather specialty store in
              Rome.
            </p>
            <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
              <span className="inline-block false">$18.59</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;

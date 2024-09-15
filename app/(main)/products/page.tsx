import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import HeaderFilter from '../_components/product-list/HeaderFilter';
import SideFilter from '../_components/product-list/SideFilter';

const products = [
  {
    id: 1,
    title: 'Design',
    thumbnail: '/assets/images/categories/design.jpg',
  },

  {
    id: 3,
    title: 'Development',
    thumbnail: '/assets/images/categories/development.jpg',
  },
  {
    id: 4,
    title: 'Marketing',
    thumbnail: '/assets/images/categories/marketing.jpg',
  },
  {
    id: 5,
    title: 'IT & Software',
    thumbnail: '/assets/images/categories/it_software.jpg',
  },
];
const ProductPage = () => {
  return (
    <section
      id="courses"
      className=" space-y-6   dark:bg-transparent p-[24px] border-t"
    >
      {/* <h2 className="text-xl md:text-2xl font-medium">All Courses</h2> */}
      <HeaderFilter />

      <section className="pb-24 pt-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <SideFilter />
          {/* Course grid */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((category) => {
              return (
                <Link key={category.id} href={`/courses/${category.id}`}>
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
                        Fendi began life in 1925 as a fur and leather specialty
                        store in Rome.
                      </p>
                      <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
                        <span className="inline-block false">$18.59</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
export default ProductPage;

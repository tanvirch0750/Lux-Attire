import Image from 'next/image';
import Link from 'next/link';
import HeaderFilter from '../_components/product-list/HeaderFilter';
import SideFilter from '../_components/product-list/SideFilter';
import ProductCard from '../_components/product-list/ProductCard';

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
              return <ProductCard />;
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
export default ProductPage;

import ActiveFilters from './ActiveFilters';
import FilterProductMobile from './FilterProductMobile';
import SearchProduct from './SerarchProduct';
import SortProduct from './SortProduct';

export default function HeaderFilter() {
  return (
    <>
      {/* header filter */}
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchProduct />

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortProduct />

          {/* Filter Menus For Mobile */}
          <FilterProductMobile />
        </div>
      </div>
      {/* header ends */}
      {/* active filters */}
      <ActiveFilters />
    </>
  );
}

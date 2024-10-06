// import AddToCart from '@/app/(main)/_components/product/AddToCart';

// import { ImageGallery } from '@/app/(main)/_components/product/ImageGallery';
// import { Materials } from '@/app/(main)/_components/product/Materials';
// import { Policies } from '@/app/(main)/_components/product/Policies';
// import { ProductDetailReviews } from '@/app/(main)/_components/product/ProductDetailReviews';
// import { ProductDetails } from '@/app/(main)/_components/product/ProductDetails';
// import { ProductHeading } from '@/app/(main)/_components/product/ProductHeading';
// import { RelatedProducts } from '@/app/(main)/_components/product/RelatedProducts';
// import { Reviews } from '@/app/(main)/_components/product/Reviews';
// import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
// import { product } from '@/app/(main)/products/[category]/[id]/data';
// import AvailableDeatilsAdmin from '@/app/(main)/_components/product/AvailableDetailsAdmin';
// import PageHeader from '@/app/(dashboard)/_components/PageHeader';

// export default async function ProductDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return (
//     <PageContainer scrollable>
//       <PageHeader
//         btnLabel="Product List"
//         btnLink="/dashboard/products"
//         heading="Product Details"
//       />
//       <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-2">
//         <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
//           <div className="lg:col-span-5 lg:col-start-8">
//             <ProductHeading product={product} />
//             <ProductDetailReviews product={product} />
//           </div>

//           <ImageGallery />

//           <div className="mt-8 lg:col-span-5">
//             <AvailableDeatilsAdmin product={product} />

//             <ProductDetails />
//             <Materials />
//           </div>
//         </div>
//       </main>
//     </PageContainer>
//   );
// }

export default function page() {
  return <div>Comming Soon</div>;
}

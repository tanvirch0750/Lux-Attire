import PageHeader from '@/app/(dashboard)/_components/PageHeader';
import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import { getAllCategories } from '@/db/actions-and-queries/category/category-queries';
import { Types } from 'mongoose';
import UpdateProductForm, {
  IProductFormInputs,
} from '../../_components/UpdateProductForm';
import { getProductById } from '@/db/actions-and-queries/products/products-queries';
import { ICategory } from '@/db/models/category-model';

export default async function UpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params?.id as unknown as Types.ObjectId);

  const categories = await getAllCategories();

  const productData: IProductFormInputs = {
    _id: product?._id,
    category: product?.category?._id || '',
    name: product?.name || '',
    price: product?.price || 0,
    isAvailable: product?.isAvailable || false,
    images:
      product?.images.map((image: any, index: number) => ({
        id: image?.id || `${index}`,
        color: image?.color || '',
        imageSrc: image?.imageSrc || '',
        imageAlt: image?.imageAlt || '',
        primary: image?.primary || false,
      })) || [],
    colors:
      product?.colors.map((color: any) => ({
        name: color?.name || '',
        bgColor: color?.bgColor || '',
        selectedColor: color?.selectedColor || '',
      })) || [],
    sizes:
      product?.sizes.map((size: any) => ({
        name: size?.name || '',
        inStock: size?.inStock || false,
      })) || [],
    description: product?.description || '',
    details: product?.details || [],
  };

  return (
    <PageContainer>
      <PageHeader
        btnLabel="Product List"
        btnLink="/dashboard/products"
        heading="Update Product"
      />
      <UpdateProductForm
        initialData={productData}
        categories={categories as ICategory[]}
      />
    </PageContainer>
  );
}

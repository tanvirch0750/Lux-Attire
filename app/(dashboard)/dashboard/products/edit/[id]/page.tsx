import PageHeader from '@/app/(dashboard)/_components/PageHeader';
import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import { getAllCategories } from '@/db/actions-and-queries/category/category-queries';
import { Types } from 'mongoose';
import UpdateProductForm from '../../_components/UpdateProductForm';
import { getProductById } from '@/db/actions-and-queries/products/products-queries';
import { ICategory } from '@/db/models/category-model';
import { z } from 'zod';

const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const productSchema = z.object({
  _id: z.string().optional(),
  category: z.string().nonempty('Category is required'),
  name: z
    .string()
    .min(1, 'Product name is required')
    .refine((val) => !val.includes('---'), {
      message: "Product name cannot include '---'",
    }),
  price: z.number().min(0, 'Price must be a non-negative number'),
  isAvailable: z.boolean(),
  images: z
    .array(
      z.object({
        id: z.string(),
        color: z.string(),
        imageSrc: z.string().url('Invalid image URL'),
        imageAlt: z.string().min(1, 'Image alt text is required'),
        primary: z.boolean(),
      })
    )
    .nonempty('At least one image is required'),
  colors: z
    .array(
      z.object({
        name: z.string().min(1, 'Color name is required'),
        bgColor: z.string().min(1, 'Background color is required'),
        selectedColor: z.string().min(1, 'Selected color is required'),
        sizeStocks: z
          .array(
            z.object({
              size: z.enum(sizeList),
              stock: z.number().min(0, 'Stock must be a non-negative number'),
              isAvailable: z.boolean(),
            })
          )
          .nonempty('At least one size stock is required'),
      })
    )
    .nonempty('At least one color is required'),
  sizes: z
    .array(
      z.object({
        name: z.enum(sizeList),
        inStock: z.boolean(),
      })
    )
    .nonempty('At least one size is required'),
  description: z.string().min(1, 'Description is required'),
  details: z
    .array(z.string().min(1, 'Detail is required'))
    .nonempty('At least one detail is required'),
});

type ProductFormInputs = z.infer<typeof productSchema>;

export default async function UpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params?.id as unknown as Types.ObjectId);
  const categories = await getAllCategories();

  const productData: ProductFormInputs = {
    _id: product?._id?.toString(),
    category: product?.category?._id?.toString() || '',
    name: product?.name || '',
    price: product?.price || 0,
    isAvailable: product?.isAvailable || false,
    images:
      product?.images.map((image: any) => ({
        id: image?.id || '',
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
        sizeStocks: sizeList.map((size) => ({
          size,
          stock:
            color?.sizeStocks?.find((ss: any) => ss.size === size)?.stock || 0,
          isAvailable:
            color?.sizeStocks?.find((ss: any) => ss.size === size)
              ?.isAvailable || false,
        })),
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
      <UpdateProductForm
        initialData={productData}
        categories={categories as ICategory[]}
      />
    </PageContainer>
  );
}

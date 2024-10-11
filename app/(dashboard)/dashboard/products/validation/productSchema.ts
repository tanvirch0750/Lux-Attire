import { z } from 'zod';

const sizeStockSchema = z.object({
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
    errorMap: () => ({ message: 'Invalid size name' }),
  }),
  stock: z.number().min(0, 'Stock must be a non-negative number'),
  isAvailable: z.boolean(),
});

export const productSchema = z.object({
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
          .array(sizeStockSchema)
          .nonempty('At least one size stock is required'),
      })
    )
    .nonempty('At least one color is required'),
  sizes: z
    .array(
      z.object({
        name: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
          errorMap: () => ({ message: 'Invalid size name' }),
        }),
        inStock: z.boolean(),
      })
    )
    .nonempty('At least one size is required'),
  description: z.string().min(1, 'Description is required'),
  details: z
    .array(z.string().min(1, 'Detail is required'))
    .nonempty('At least one detail is required'),
});

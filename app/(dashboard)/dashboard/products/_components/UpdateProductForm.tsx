'use client';

import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../validation/productSchema';
import { NumberInput } from './NumberInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface IProductFormInputs {
  category: string;
  name: string;
  price: number;
  isAvailable: boolean;
  images: {
    id: string;
    imageSrc: string;
    imageAlt: string;
    primary: boolean;
  }[];
  colors: { name: string; bgColor: string; selectedColor: string }[];
  sizes: { name: string; inStock: boolean }[];
  description: string;
  details: string[];
}

interface UpdateProductFormProps {
  initialData: IProductFormInputs;
  onSubmit: (data: IProductFormInputs) => void;
}

// Example categories (replace with your data)
const categories = [
  { id: '1', label: "Women's Collection", value: 'women-collection' },
  { id: '2', label: 'Active Wear', value: 'active-wear' },
  { id: '3', label: 'Kids Wear', value: 'kids-wear' },
  { id: '4', label: 'Traditional Clothing', value: 'traditional-clothing' },
  { id: '5', label: "Men's Wear", value: 'men-wear' },
  { id: '6', label: 'Accessories', value: 'accessories' },
];

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: 'colors',
  });

  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: 'sizes',
  });

  const {
    fields: detailFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: 'details',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 bg-white rounded"
    >
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block font-medium text-gray-700">
          Product Name
        </label>
        <Input
          id="name"
          placeholder="Product Name"
          {...register('name')}
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label htmlFor="price" className="block font-medium text-gray-700">
          Price
        </label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <NumberInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          {...register('category')}
          className={`mt-1 block w-full py-2 px-3 border focus:outline-0 bg-white ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Available */}
      <div className="mb-4">
        <label htmlFor="isAvailable" className="flex items-center">
          <Checkbox {...register('isAvailable')} />
          <span className=" font-medium text-gray-700 ml-2">Is Available</span>
        </label>
        {errors.isAvailable && (
          <p className="mt-1 text-sm text-red-600">
            {errors.isAvailable.message}
          </p>
        )}
      </div>

      {/* Images */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Images</label>
        {imageFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center">
            <Input
              {...register(`images.${index}.id` as const)}
              type="string"
              className="mr-2 block w-16 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="ID"
            />
            <Input
              {...register(`images.${index}.imageSrc` as const)}
              type="text"
              className="mr-2 block w-1/3 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Image Source"
            />
            <Input
              {...register(`images.${index}.imageAlt` as const)}
              type="text"
              className="mr-2 block w-1/3 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Image Alt"
            />
            <Checkbox
              {...register(`images.${index}.primary` as const)}
              className="mr-2 h-4 w-4"
            />
            <span>Primary</span>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendImage({ id: '', imageSrc: '', imageAlt: '', primary: false })
          }
          className="text-brand hover:text-brand/90 text-sm"
        >
          Add Image
        </button>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Colors</label>
        {colorFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center">
            <Input
              {...register(`colors.${index}.name` as const)}
              type="text"
              className="mr-2 block w-1/4 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Color Name"
            />
            <Input
              {...register(`colors.${index}.bgColor` as const)}
              type="text"
              className="mr-2 block w-1/4 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Background Color"
            />
            <Input
              {...register(`colors.${index}.selectedColor` as const)}
              type="text"
              className="mr-2 block w-1/4 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Selected Color"
            />
            <button
              type="button"
              onClick={() => removeColor(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendColor({ name: '', bgColor: '', selectedColor: '' })
          }
          className="text-brand hover:text-brand/90 text-sm"
        >
          Add Color
        </button>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Sizes</label>
        {sizeFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center">
            <Input
              {...register(`sizes.${index}.name` as const)}
              type="text"
              className="mr-2 block w-1/4 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Size"
            />
            <Checkbox
              {...register(`sizes.${index}.inStock` as const)}
              className="mr-2 h-4 w-4"
            />
            <span>In Stock</span>
            <button
              type="button"
              onClick={() => removeSize(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendSize({ name: '', inStock: false })}
          className="text-brand hover:text-brand/90 text-sm"
        >
          Add Size
        </button>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block font-medium text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="description"
          {...register('description')}
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
          placeholder="Description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Details</label>
        {detailFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center">
            <Input
              {...register(`details.${index}` as const)}
              type="text"
              className="mr-2 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
              placeholder="Detail"
            />
            <button
              type="button"
              onClick={() => removeDetail(index)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          // @ts-ignore
          onClick={() => appendDetail('')}
          className="text-brand hover:text-brand/90 text-sm"
        >
          Add Detail
        </button>
      </div>

      <Button type="submit" className="w-full bg-brand text-white py-2">
        Update Product
      </Button>
    </form>
  );
};

export default UpdateProductForm;

{
  /* <UpdateProductForm
  initialData={productData} // Pass the existing product data here
  onSubmit={handleProductUpdate} // Callback for submitting updated data
/> */
}

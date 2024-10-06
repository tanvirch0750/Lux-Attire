/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../validation/productSchema';
import { NumberInput } from './NumberInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Types } from 'mongoose';
import { ICategory } from '@/db/models/category-model';
import { SizeDescription } from '@/app/(main)/_components/product/SizeDescription';
import { updateProdcutAction } from '@/app/actions/product/product';
import { IProduct } from '@/db/models/product-model';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export interface IProductFormInputs {
  _id?: string | Types.ObjectId;
  category: string;
  name: string;
  price: number;
  isAvailable: boolean;
  images: {
    id: string;
    imageSrc: string;
    imageAlt: string;
    color: string;
    primary: boolean;
  }[];
  colors: { name: string; bgColor: string; selectedColor: string }[];
  sizes: { name: string; inStock: boolean }[];
  description: string;
  details: string[];
}

interface UpdateProductFormProps {
  initialData: IProductFormInputs;
  categories: ICategory[];
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  initialData,
  categories,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
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

  const handleUpdateProduct: SubmitHandler<IProductFormInputs> = async (
    data
  ) => {
    console.log('Submitted data:', data);

    try {
      setLoading(true);

      const result = await updateProdcutAction(
        initialData?._id!,
        data as unknown as IProduct
      );

      if (result.status === 200) {
        toast.success('Product updated successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Product updation Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProduct)}
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
          {categories?.map((cat) => (
            <option key={cat?._id} value={cat?._id}>
              {cat?.label}
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
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={(value: boolean) => field.onChange(value)}
              />
            )}
          />
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
          <div
            key={field.id}
            className="mb-2 grid grid-cols-12 lg:grid-cols-15 gap-3 border items-center p-3 rounded-md"
          >
            <div className="col-span-6 lg:col-span-1">
              <Input
                {...register(`images.${index}.id` as const)}
                type="text"
                className="mr-2 block py-2 px-3 border border-gray-300 rounded-md shadow-sm w-full"
                placeholder="ID"
              />
            </div>
            <div className="col-span-6 lg:col-span-2">
              <Input
                {...register(`images.${index}.color` as const)}
                type="text"
                className="mr-2 block py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Product Color"
              />
            </div>
            <div className="col-span-6 lg:col-span-2">
              <Input
                {...register(`images.${index}.imageAlt` as const)}
                type="text"
                className="mr-2 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Image Alt"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-6 lg:col-span-3">
              <Controller
                control={control}
                name={`images.${index}.imageSrc`}
                render={({ field }) => (
                  <div className=" flex gap-1 items-center">
                    {/* Conditionally render Upload Button or Image */}
                    <div>
                      {/* Show uploaded image */}
                      <Image
                        src={field.value}
                        alt={field.value}
                        width={100}
                        height={80}
                        className="mt-2 w-24 h-20 object-cover"
                      />
                    </div>
                    <CldUploadWidget
                      uploadPreset="luxe-attire"
                      onSuccess={(result) => {
                        // @ts-ignore
                        const imageUrl = result?.info?.url;
                        console.log('Uploaded Image URL:', imageUrl);

                        // Set the imageSrc field for this particular image index
                        field.onChange(imageUrl); // Ensure this updates the value in the form
                      }}
                    >
                      {({ open }) => (
                        <Button
                          size="sm"
                          className="bg-brand hover:bg-brand/90"
                          onClick={() => open()}
                        >
                          Update
                        </Button>
                      )}
                    </CldUploadWidget>
                  </div>
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-3 flex items-center gap-2">
              <Controller
                control={control}
                name={`images.${index}.primary`}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(value: boolean) => field.onChange(value)}
                    className="mr-2 h-4 w-4"
                  />
                )}
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
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendImage({
              id: '',
              imageSrc: '',
              imageAlt: '',
              color: '',
              primary: false,
            })
          }
          className="mt-2 text-brand hover:text-brand/90 text-sm"
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
        <label className="block font-medium text-gray-700 mb-1">
          Sizes (<SizeDescription />)
        </label>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
          {sizeFields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center">
              <Input
                {...register(`sizes.${index}.name` as const)}
                type="text"
                className="mr-2 block w-1/4 py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                placeholder="Size Name"
              />

              <Controller
                name={`sizes.${index}.inStock`}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(value: boolean) => field.onChange(value)}
                    className="mr-2 h-4 w-4"
                  />
                )}
              />
              <span>In Stock</span>
            </div>
          ))}
        </div>
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

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          className="w-full px-4 py-2 bg-brand text-white font-semibold rounded-md hover:bg-brand/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Product
            </>
          ) : (
            <> Update Product</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProductForm;

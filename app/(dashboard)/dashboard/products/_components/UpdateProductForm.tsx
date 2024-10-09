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
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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

  const { fields: sizeFields } = useFieldArray({
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
    try {
      setLoading(true);
      const result = await updateProdcutAction(
        initialData?._id as string,
        data as unknown as IProduct
      );
      if (result.status === 200) {
        toast.success('Product updated successfully', {
          position: 'top-center',
        });
      }
      if (result.status === 404) {
        toast.error(result?.error, { position: 'top-center' });
      }
    } catch (error) {
      toast.error('Product update failed. Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
          <CardDescription>
            Make changes to your product information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Product Name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
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
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Category and Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <Select
                // @ts-ignore
                onValueChange={(value) => register('category').onChange(value)}
                defaultValue={initialData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    // @ts-ignore
                    <SelectItem key={cat?._id} value={cat?._id}>
                      {cat?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="isAvailable">Product Availability</Label>
              <div className="flex items-center space-x-2">
                <Controller
                  name="isAvailable"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="isAvailable"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <Label htmlFor="isAvailable">Is Available</Label>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Images</Label>
            {imageFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                      {...register(`images.${index}.id` as const)}
                      placeholder="ID"
                    />
                    <Input
                      {...register(`images.${index}.color` as const)}
                      placeholder="Product Color"
                    />
                    <Input
                      {...register(`images.${index}.imageAlt` as const)}
                      placeholder="Image Alt"
                    />
                    <Controller
                      control={control}
                      name={`images.${index}.imageSrc`}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Image
                            src={field.value}
                            alt={field.value}
                            width={100}
                            height={80}
                            className="w-24 h-20 object-cover rounded"
                          />
                          <CldUploadWidget
                            uploadPreset="luxe-attire"
                            onSuccess={(result) => {
                              const imageUrl = (result?.info as { url: string })
                                ?.url;
                              field.onChange(imageUrl);
                            }}
                          >
                            {({ open }) => (
                              <Button onClick={() => open()} size="sm">
                                Update
                              </Button>
                            )}
                          </CldUploadWidget>
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Controller
                        control={control}
                        name={`images.${index}.primary`}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id={`primary-${index}`}
                          />
                        )}
                      />
                      <Label htmlFor={`primary-${index}`}>Primary</Label>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendImage({
                  id: '',
                  imageSrc: '',
                  imageAlt: '',
                  color: '',
                  primary: false,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Image
            </Button>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <Label>Colors</Label>
            {colorFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      {...register(`colors.${index}.name` as const)}
                      placeholder="Color Name"
                    />
                    <Input
                      {...register(`colors.${index}.bgColor` as const)}
                      placeholder="Background Color"
                    />
                    <Input
                      {...register(`colors.${index}.selectedColor` as const)}
                      placeholder="Selected Color"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4"
                    onClick={() => removeColor(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                appendColor({ name: '', bgColor: '', selectedColor: '' })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Color
            </Button>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <Label>
              Sizes (<SizeDescription />)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sizeFields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Input
                    {...register(`sizes.${index}.name` as const)}
                    className="w-16"
                    readOnly
                  />
                  <Controller
                    control={control}
                    name={`sizes.${index}.inStock`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={`inStock-${index}`}
                      />
                    )}
                  />
                  <Label htmlFor={`inStock-${index}`}>In Stock</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <Label>Product Details</Label>
            {detailFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input
                  {...register(`details.${index}` as const)}
                  placeholder="Detail"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeDetail(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              // @ts-ignore
              onClick={() => appendDetail('')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Detail
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              rows={4}
              placeholder="Product Description"
            />
            {errors.description && (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className=" w-fit bg-brand hover:bg-brand/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Product
              </>
            ) : (
              'Update Product'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UpdateProductForm;

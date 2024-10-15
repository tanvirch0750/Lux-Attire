'use client';

import React, { useEffect, useState } from 'react';
import {
  useForm,
  Controller,
  useFieldArray,
  SubmitHandler,
  useWatch,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NumberInput } from './NumberInput';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { ICategory } from '@/db/models/category-model';

import { IProduct } from '@/db/models/product-model';
import { toast } from 'react-toastify';
import { Loader2, Plus, Trash2, X } from 'lucide-react';
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
import { updateProdcutAction } from '@/app/actions/product/product';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const sizeStockSchema = z.object({
  size: z.enum(sizeList),
  stock: z.number().min(0, 'Stock must be a non-negative number'),
  isAvailable: z.boolean(),
  sizeMetric: z.record(z.string(), z.number()).optional(),
});

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
          .array(sizeStockSchema)
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

interface UpdateProductFormProps {
  initialData: ProductFormInputs;
  categories: ICategory[];
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  initialData,
  categories,
}) => {
  const [loading, setLoading] = useState(false);
  const [sizeMetrics, setSizeMetrics] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ProductFormInputs>({
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
    fields: detailFields,
    append: appendDetail,
    remove: removeDetail,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: 'details',
  });

  const watchedImages = useWatch({ control, name: 'images' });
  const watchedColors = useWatch({ control, name: 'colors' });

  const handleUpdateProduct: SubmitHandler<ProductFormInputs> = async (
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

  const handleAddSizeMetric = (metric: string) => {
    const formattedMetric = metric.trim().toLowerCase().replace(/\s+/g, '_');
    if (formattedMetric && !sizeMetrics.includes(formattedMetric)) {
      setSizeMetrics([...sizeMetrics, formattedMetric]);
      colorFields.forEach((_, colorIndex) => {
        sizeList.forEach((_, sizeIndex) => {
          setValue(
            `colors.${colorIndex}.sizeStocks.${sizeIndex}.sizeMetric.${formattedMetric}`,
            0
          );
        });
      });
    }
  };

  const handleRemoveSizeMetric = (metricToRemove: string) => {
    setSizeMetrics(sizeMetrics.filter((metric) => metric !== metricToRemove));
    colorFields.forEach((_, colorIndex) => {
      sizeList.forEach((_, sizeIndex) => {
        const currentSizeMetrics = {
          ...watchedColors[colorIndex].sizeStocks[sizeIndex].sizeMetric,
        };
        delete currentSizeMetrics[metricToRemove];
        setValue(
          `colors.${colorIndex}.sizeStocks.${sizeIndex}.sizeMetric`,
          currentSizeMetrics
        );
      });
    });
  };

  useEffect(() => {
    // Extract all unique size metrics from the initial data
    const metrics = new Set<string>();
    initialData.colors.forEach((color) => {
      color.sizeStocks.forEach((sizeStock) => {
        if (sizeStock.sizeMetric) {
          Object.keys(sizeStock.sizeMetric).forEach((metric) =>
            metrics.add(metric)
          );
        }
      });
    });
    setSizeMetrics(Array.from(metrics));
  }, [initialData]);

  useEffect(() => {
    // Populate sizeMetric data for each color and size
    colorFields.forEach((_, colorIndex) => {
      sizeList.forEach((_, sizeIndex) => {
        const currentSizeMetrics =
          initialData.colors[colorIndex]?.sizeStocks[sizeIndex]?.sizeMetric ||
          {};
        sizeMetrics.forEach((metric) => {
          if (!(metric in currentSizeMetrics)) {
            setValue(
              `colors.${colorIndex}.sizeStocks.${sizeIndex}.sizeMetric.${metric}`,
              0
            );
          }
        });
      });
    });
  }, [colorFields, sizeMetrics, setValue, initialData.colors]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProduct)}
      className="space-y-8 mb-8"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-1">
            <span>Update Product</span>{' '}
            <Link href="/dashboard/products">
              <Button className="bg-brand hover:bg-brand/90">
                Products List
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>
            Make changes to your product information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-brand">
                Product Name
              </Label>
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
              <Label htmlFor="price" className="text-brand">
                Price
              </Label>
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
              <Label htmlFor="category" className="text-brand">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
                )}
              />
              {errors.category && (
                <p className="text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="isAvailable" className="text-brand">
                Product Availability
              </Label>
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
            <Label className="text-brand">Images</Label>
            {imageFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input
                      {...register(`images.${index}.id` as const)}
                      placeholder="ID"
                    />
                    <div className="relative">
                      <Input
                        {...register(`images.${index}.color` as const)}
                        placeholder="Product Color (#ffffff)"
                      />
                      <div
                        className="absolute right-2 top-[20px] transform -translate-y-1/2 w-6 h-6 rounded-full border"
                        style={{
                          backgroundColor:
                            watchedImages[index]?.color || 'transparent',
                        }}
                      />
                    </div>
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

          {/* Colors and Size Stocks */}
          <div className="space-y-2">
            <Label className="text-brand">Colors and Size Stocks</Label>
            {colorFields.map((field, colorIndex) => (
              <Card key={field.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Input
                      {...register(`colors.${colorIndex}.name` as const)}
                      placeholder="Color Name"
                    />
                    <div className="relative">
                      <Input
                        {...register(`colors.${colorIndex}.bgColor` as const)}
                        placeholder="#fffff (background-color)"
                      />
                      <div
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border"
                        style={{
                          backgroundColor:
                            watchedColors[colorIndex]?.bgColor || 'transparent',
                        }}
                      />
                    </div>
                    <div className="relative">
                      <Input
                        {...register(
                          `colors.${colorIndex}.selectedColor` as const
                        )}
                        placeholder="#f0f0f0 (Selected Color)"
                      />
                      <div
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border"
                        style={{
                          backgroundColor:
                            watchedColors[colorIndex]?.selectedColor ||
                            'transparent',
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-brand">
                        Sizes and Stocks (unit number)
                      </Label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Add Metric Fields</Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Add Size Metric</DialogTitle>
                          </DialogHeader>
                          <Input
                            placeholder="Enter metric name (e.g., chest, waist)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddSizeMetric(e.currentTarget.value);
                                e.currentTarget.value = '';
                              }
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="grid gap-4 text-sm md:text-base">
                      {sizeList.map((size, sizeIndex) => (
                        <div
                          key={size}
                          className="grid gap-2 items-center rounded-md border p-1 md:p-5"
                        >
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <div>
                              <Label>Size</Label>
                              <Input value={size} readOnly className="w-full" />
                            </div>
                            <div>
                              <Label>Unit</Label>
                              <Controller
                                name={`colors.${colorIndex}.sizeStocks.${sizeIndex}.stock`}
                                control={control}
                                render={({ field }) => (
                                  <NumberInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                  />
                                )}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Controller
                                name={`colors.${colorIndex}.sizeStocks.${sizeIndex}.isAvailable`}
                                control={control}
                                render={({ field }) => (
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id={`isAvailable-${colorIndex}-${sizeIndex}`}
                                  />
                                )}
                              />
                              <Label>Is Available</Label>
                            </div>
                          </div>
                          {sizeMetrics.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-2">
                              {sizeMetrics.map((metric) => (
                                <div
                                  key={metric}
                                  className="space-y-1 relative"
                                >
                                  <div className=" flex items-center gap-2">
                                    <Label>{metric} (inch)</Label>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className=" h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200"
                                      onClick={() =>
                                        handleRemoveSizeMetric(metric)
                                      }
                                    >
                                      <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                  <div className="flex items-center">
                                    <Controller
                                      name={`colors.${colorIndex}.sizeStocks.${sizeIndex}.sizeMetric.${metric}`}
                                      control={control}
                                      render={({ field }) => (
                                        <NumberInput
                                          value={field.value}
                                          onChange={field.onChange}
                                          onBlur={field.onBlur}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-4"
                    onClick={() => removeColor(colorIndex)}
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
                appendColor({
                  name: '',
                  bgColor: '',
                  selectedColor: '',
                  // @ts-ignore
                  sizeStocks: sizeList.map((size) => ({
                    size,
                    stock: 0,
                    isAvailable: false,
                    sizeMetric: {},
                  })),
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Color
            </Button>
          </div>

          {/* Size Metrics */}
          <div className="space-y-2">
            <Label className="text-brand">Size Metrics</Label>
            <div className="flex flex-wrap gap-2">
              {sizeMetrics.map((metric) => (
                <div
                  key={metric}
                  className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                >
                  <span>{metric}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-5 w-5 p-0"
                    onClick={() => handleRemoveSizeMetric(metric)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <Label className="text-brand">Global Sizes | Legacy field</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sizeList.map((size, index) => (
                <div key={size} className="flex items-center space-x-2">
                  <Input value={size} className="w-16" readOnly />
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
            <Label className="text-brand">Product Details</Label>
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
            <Label htmlFor="description" className="text-brand">
              Description
            </Label>
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
            className="w-fit bg-brand hover:bg-brand/90"
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

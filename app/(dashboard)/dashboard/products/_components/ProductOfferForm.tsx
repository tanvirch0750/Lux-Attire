'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';

import { toast } from 'react-toastify';
import { addOfferToProductAction } from '@/app/actions/product/product';
import { IOffer } from '@/db/models/product-model';

const offerSchema = z.object({
  offerType: z.enum(['discount', 'freeShipping']),
  value: z.number().min(0, 'Value must be a positive number'),
  validUntil: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  isActive: z.boolean(),
});

const productOffersSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  offers: z.array(offerSchema).min(1, 'At least one offer is required'),
});

type FormValues = z.infer<typeof productOffersSchema>;

interface ProductOffersFormProps {
  productId: string;
  defaultOffers?: IOffer[];
}

export default function ProductOffersForm({
  productId,
  defaultOffers = [],
}: ProductOffersFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productOffersSchema),
    defaultValues: {
      productId,
      // @ts-ignore
      offers:
        defaultOffers.length > 0
          ? defaultOffers
          : [
              {
                offerType: 'discount',
                value: 0,
                validUntil: new Date().toISOString().split('T')[0],
                isActive: true,
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'offers',
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    console.log(data);
    try {
      await addOfferToProductAction(data.productId, data.offers);
      toast.success('Offers updated successfully', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Offer update error', error);
      toast.error('Product update failed. Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Product Offers</CardTitle>
          <CardDescription>Manage offers for this product.</CardDescription>
        </CardHeader>
        <CardContent>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 mb-6 p-4 border rounded">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-brand">
                  Offer {index + 1}
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`offers.${index}.offerType`}>
                    Offer Type
                  </Label>
                  <Controller
                    name={`offers.${index}.offerType`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select offer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="discount">Discount</SelectItem>
                          <SelectItem value="freeShipping">
                            Free Shipping
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.offers?.[index]?.offerType && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.offers[index]?.offerType?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`offers.${index}.value`}>
                    Value (%) (if free shipping then 0)
                  </Label>
                  <Controller
                    name={`offers.${index}.value`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                  {errors.offers?.[index]?.value && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.offers[index]?.value?.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`offers.${index}.validUntil`}>
                    Valid Until
                  </Label>
                  <Controller
                    name={`offers.${index}.validUntil`}
                    control={control}
                    render={({ field }) => <Input {...field} type="date" />}
                  />
                  {errors.offers?.[index]?.validUntil && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.offers[index]?.validUntil?.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Controller
                    name={`offers.${index}.isActive`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="w-4 h-4"
                      />
                    )}
                  />
                  <Label htmlFor={`offers.${index}.isActive`}>Is Active</Label>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                offerType: 'discount',
                value: 0,
                validUntil: new Date().toISOString().split('T')[0],
                isActive: true,
              })
            }
            className="mt-2"
          >
            Add Offer
          </Button>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand hover:bg-brand/90"
          >
            {isSubmitting ? 'Saving...' : 'Save Offers'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

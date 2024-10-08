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
import { Trash2 } from 'lucide-react';
import { createOrUpdateShippingAction } from '@/app/actions/settings/settings';
import { toast } from 'react-toastify';

// Define the Zod schema for validation
const shippingMethodSchema = z.object({
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  price: z.number().min(0, 'Price must be a positive number'),
});

const settingsSchema = z.object({
  shippingPrice: z
    .array(shippingMethodSchema)
    .min(1, 'At least one shipping method is required'),
});

type FormValues = z.infer<typeof settingsSchema>;

interface UpdateShippingFormProps {
  defaultShippingData?: FormValues['shippingPrice'];
}

export default function UpdateShippingForm({
  defaultShippingData,
}: UpdateShippingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      shippingPrice:
        defaultShippingData && defaultShippingData.length > 0
          ? defaultShippingData
          : [{ shippingMethod: '', price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'shippingPrice',
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await createOrUpdateShippingAction(data.shippingPrice);
      toast.success('Shipping price updated successfully', {
        position: 'top-center',
      });
    } catch (error) {
      toast.error('Category updation Failed, Something went wrong', {
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
          <CardTitle>Shipping Settings</CardTitle>
          <CardDescription>
            Manage your shipping methods and prices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-4 mb-4">
              <div className="flex-1">
                <Label htmlFor={`shippingMethod-${index}`}>
                  Shipping Method
                </Label>
                <Controller
                  name={`shippingPrice.${index}.shippingMethod`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={`shippingMethod-${index}`}
                      placeholder="e.g., Standard Shipping"
                    />
                  )}
                />
                {errors.shippingPrice?.[index]?.shippingMethod && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.shippingPrice[index]?.shippingMethod?.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor={`price-${index}`}>Price</Label>
                <Controller
                  name={`shippingPrice.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id={`price-${index}`}
                      type="number"
                      step="0.01"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  )}
                />
                {errors.shippingPrice?.[index]?.price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.shippingPrice[index]?.price?.message}
                  </p>
                )}
              </div>
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
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ shippingMethod: '', price: 0 })}
            className="mt-2"
          >
            Add Shipping Method
          </Button>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

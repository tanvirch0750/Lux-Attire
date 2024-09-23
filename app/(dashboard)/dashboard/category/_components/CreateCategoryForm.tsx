'use client';

import { createCategoryAction } from '@/app/actions/category/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateOrUpdate } from '@/hooks/useCreateOrUpdate';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CategoryFormValues {
  label: string;
  value: string;
}

const CreateCategoryForm = () => {
  const [loading, setLoding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      label: '',
      value: '',
    },
  });

  const handleCreateCategory: SubmitHandler<CategoryFormValues> = async (
    data
  ) => {
    try {
      setLoding(true);

      const result = await createCategoryAction(data);

      if (result.status === 200) {
        toast.success('Category created successfully', {
          position: 'top-center',
        });
        reset();
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
        reset();
      }
    } catch (error) {
      toast.error('Category Creation Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoding(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateCategory)}
      className="max-w-lg mx-auto p-8 bg-white rounded-md "
    >
      {/* Label */}
      <div className="mb-4">
        <label htmlFor="label" className="block font-medium text-gray-700">
          Label
        </label>
        <Input
          id="label"
          type="text"
          {...register('label', { required: 'Label is required' })}
          className={`mt-1 block w-full py-2 px-3 border text-md ${
            errors.label ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
          placeholder="Women's Collection"
        />
        {errors.label && (
          <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <label htmlFor="value" className="block font-medium text-gray-700">
          Value
        </label>
        <Input
          id="value"
          type="text"
          {...register('value', { required: 'Value is required' })}
          className={`mt-1 block w-full py-2 px-3 border text-md ${
            errors.value ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
          placeholder="women-collection"
        />
        {errors.value && (
          <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          type="submit"
          className="w-full px-4 py-2 bg-brand text-white font-semibold rounded-md hover:bg-brand/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <> Create Category</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;

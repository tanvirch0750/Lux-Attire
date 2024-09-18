'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface CategoryFormValues {
  label: string;
  value: string;
}

const CreateCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      label: '',
      value: '',
    },
  });

  const handleCreateCategory: SubmitHandler<CategoryFormValues> = (data) => {
    console.log(data);
    // Call API to create category with data (id, label, value)
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
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.label ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
          placeholder="Enter Category Label"
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
          className={`mt-1 block w-full py-2 px-3 border ${
            errors.value ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm`}
          placeholder="Enter Category Value"
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
        >
          Create Category
        </Button>
      </div>
    </form>
  );
};

export default CreateCategoryForm;

'use client';

import { updateCategoryAction } from '@/app/actions/category/category';
import LoadingButton from '@/components/LodingButton';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CategoryFormValues {
  id: string;
  label: string;
  value: string;
}

interface UpdateCategoryFormProps {
  initialData: CategoryFormValues; // The initial category data to be edited
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
  initialData,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      id: initialData.id,
      label: initialData.label,
      value: initialData.value,
    },
  });

  const handleUpdateCategory: SubmitHandler<CategoryFormValues> = async (
    data
  ) => {
    try {
      setLoading(true);

      const result = await updateCategoryAction(data?.id, {
        label: data?.label,
        value: data?.value,
      });

      if (result.status === 200) {
        toast.success('Category updated successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Category updation Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to set initial values if not passed via defaultValues prop
  useEffect(() => {
    if (initialData) {
      setValue('id', initialData.id);
      setValue('label', initialData.label);
      setValue('value', initialData.value);
    }
  }, [initialData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdateCategory)}
      className="max-w-lg mx-auto p-4 bg-white rounded-md shadow-md"
    >
      {/* ID - Readonly */}
      <div className="mb-4">
        <label htmlFor="id" className="block font-medium text-gray-700">
          Category ID (Readonly)
        </label>
        <input
          id="id"
          type="text"
          {...register('id', {
            required: 'Category ID is required',
          })}
          className={`mt-1 block w-full py-2 px-3 ${
            errors.id ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm bg-gray-100 cursor-not-allowed`}
        />
        {errors.id && (
          <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>
        )}
      </div>

      {/* Label */}
      <div className="mb-4">
        <label htmlFor="label" className="block font-medium text-gray-700">
          Label
        </label>
        <input
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
        <input
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
        <LoadingButton
          isLoading={loading}
          label="Update Category"
          loadingLabel="Please Wait"
          type="submit"
        />
      </div>
    </form>
  );
};

export default UpdateCategoryForm;

// const initialCategoryData = {
//     id: 123, // Example data
//     label: 'Electronics',
//     value: 'electronics',
//   };

//   const handleUpdateCategory: SubmitHandler<CategoryFormValues> = (data) => {
//     console.log('Updated category data:', data);
//     // Call API to update the category in the backend
//   };

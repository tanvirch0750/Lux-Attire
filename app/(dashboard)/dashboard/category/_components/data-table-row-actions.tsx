'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Edit2Icon,
  Loader2,
  Redo2Icon,
  Trash2Icon,
  Undo2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { ICategory } from '@/db/models/category-model';
import { useSession } from 'next-auth/react';
import {
  deleteCategoryAction,
  undoDeleteCategoryAction,
} from '@/app/actions/category/category';
import { toast } from 'react-toastify';
import { useState, useTransition } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [loading, setLoading] = useState(false);

  const category: ICategory = row.original as ICategory;

  const handleDeleteCategory = async () => {
    try {
      setLoading(true);

      const result = await deleteCategoryAction(category?._id!);

      if (result.status === 200) {
        toast.success('Category deleted successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Category deletion Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUndoDeleteCategory = async () => {
    try {
      setLoading(true);

      const result = await undoDeleteCategoryAction(category?._id!);

      if (result.status === 200) {
        toast.success('Category restored successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Category undo deletion Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-[100px] gap-2">
      <Link href={`/dashboard/category/${category?._id}`}>
        <Button
          className=" px-2 bg-green-100 text-green-500 hover:bg-gray-200"
          size="sm"
        >
          <Edit2Icon size={16} />
        </Button>
      </Link>
      {category?.isDeleted ? (
        // <Button
        //   className=" px-2 bg-orange-100 text-orange-500 hover:bg-orange-200"
        //   size="sm"
        //   onClick={handleUndoDeleteCategory}
        // >
        //   {loading ? (
        //     <Loader2 size={16} className="animate-spin" />
        //   ) : (
        //     <Undo2Icon size={16} />
        //   )}
        // </Button>
        <ConfirmDialog
          triggerType="undo-delete"
          title="Are you sure?"
          description="Are you sure you want to undo deletion for this category?"
          confirmText="Undo Delete"
          cancelText="Cancel"
          onConfirm={handleUndoDeleteCategory}
          isLoading={loading}
        />
      ) : (
        // <Button
        //   className=" px-2 bg-red-100 text-red-500 hover:bg-red-200"
        //   size="sm"
        //   onClick={handleDeleteCategory}
        // >
        //   {loading ? (
        //     <Loader2 size={16} className="animate-spin" />
        //   ) : (
        //     <Trash2Icon size={16} />
        //   )}
        // </Button>
        <ConfirmDialog
          triggerType="confirm-delete"
          title="Are you sure?"
          description="Are you sure you want to delete this category?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteCategory}
          isLoading={loading}
        />
      )}
    </div>
  );
}

'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, Edit2Icon } from 'lucide-react';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { IProductFrontend } from '@/db/models/product-model';
import {
  deleteProductAction,
  undoDeleteProductAction,
} from '@/app/actions/product/product';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [loading, setLoading] = useState(false);

  const products: IProductFrontend = row.original as IProductFrontend;

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);

      const result = await deleteProductAction(products?._id as string);

      if (result.status === 200) {
        toast.success('Product deleted successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Product deletion Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUndoDeleteProduct = async () => {
    try {
      setLoading(true);

      const result = await undoDeleteProductAction(products?._id as string);

      if (result.status === 200) {
        toast.success('Product restored successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Product undo deletion Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-[100px] gap-2">
      <Link href={`/dashboard/products/edit/${products?._id}`}>
        <Button
          className=" px-2 bg-green-100 text-green-500 hover:bg-gray-200"
          size="sm"
        >
          <Edit2Icon size={16} />
        </Button>
      </Link>
      {products?.isDeleted ? (
        <ConfirmDialog
          triggerType="undo-delete"
          title="Are you sure?"
          description="Are you sure you want to undo deletion for this Product?"
          confirmText="Undo Delete"
          cancelText="Cancel"
          onConfirm={handleUndoDeleteProduct}
          isLoading={loading}
        />
      ) : (
        <ConfirmDialog
          triggerType="confirm-delete"
          title="Are you sure?"
          description="Are you sure you want to delete this product?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteProduct}
          isLoading={loading}
        />
      )}
      <Link href={`/dashboard/products/${products?._id}`}>
        <Button
          className=" px-2 bg-blue-100 text-blue-500 hover:bg-blue-200"
          size="sm"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </Link>
    </div>
  );
}

'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BadgePercentIcon,
  Edit2Icon,
  ReceiptTextIcon,
} from 'lucide-react';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

import {
  deleteProductAction,
  undoDeleteProductAction,
} from '@/app/actions/product/product';
import { CustomTooltip } from '@/components/Tooltip';
import { TProduct } from '@/db/models/product-model';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [loading, setLoading] = useState(false);

  const products: TProduct = row.original as TProduct;

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
    <div className="flex items-center w-[200px] gap-2">
      <CustomTooltip
        triggerContent={
          <>
            <Link href={`/dashboard/products/details/${products?._id}`}>
              <Button
                className=" px-2 bg-orange-100 text-orange-500 hover:bg-orange-200"
                size="sm"
              >
                <ReceiptTextIcon size={16} />
              </Button>
            </Link>
          </>
        }
        tooltipContent="Deatails"
      />
      <CustomTooltip
        triggerContent={
          <>
            <Link href={`/dashboard/products/edit/${products?._id}`}>
              <Button
                className=" px-2 bg-green-100 text-green-500 hover:bg-gray-200"
                size="sm"
              >
                <Edit2Icon size={16} />
              </Button>
            </Link>
          </>
        }
        tooltipContent="Edit"
      />

      <CustomTooltip
        triggerContent={
          <>
            <Link href={`/dashboard/products/offer/${products?._id}`}>
              <Button
                className=" px-2 bg-blue-100 text-blue-500 hover:bg-blue-200"
                size="sm"
              >
                <BadgePercentIcon size={18} />
              </Button>
            </Link>
          </>
        }
        tooltipContent="Add Offer"
      />

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
    </div>
  );
}

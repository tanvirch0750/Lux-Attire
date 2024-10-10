'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

import { IOrder } from '@/db/models/order-model';
import {
  cancelOrderAction,
  deliverOrderAction,
} from '@/app/actions/order/order';
import { CustomTooltip } from '@/components/Tooltip';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [loading, setLoading] = useState(false);

  const order: IOrder = row.original as IOrder;

  const handleCancelOrder = async () => {
    try {
      setLoading(true);

      const result = await cancelOrderAction(
        order?._id as string,
        order?.user as string
      );

      if (result.status === 200) {
        toast.success('Order cancelled successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Can not cancel the order, try again', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handledeliveredProduct = async () => {
    try {
      setLoading(true);

      const result = await deliverOrderAction(order?._id as string);

      if (result.status === 200) {
        toast.success('Product delivered successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Order deliver updation failed, please try again', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-[100px] gap-2">
      <ConfirmDialog
        triggerType="cancel-order-admin"
        title="Are you sure?"
        description="Are you sure you want to cancel this order?"
        confirmText="Cancel Order"
        cancelText="No"
        onConfirm={handleCancelOrder}
        isLoading={loading}
        disabled={
          order?.isPaid ||
          order?.orderStatus === 'delivered' ||
          order?.orderStatus === 'cancelled'
        }
      />

      <ConfirmDialog
        triggerType="delivered-order"
        title="Are you sure?"
        description="Are you sure you want to mark this order as delivered?"
        confirmText="Deliver Order"
        cancelText="Cancel"
        onConfirm={handledeliveredProduct}
        isLoading={loading}
        disabled={
          order?.orderStatus === 'delivered' ||
          order?.orderStatus === 'cancelled'
        }
      />

      <CustomTooltip
        triggerContent={
          <>
            <Link href={`/dashboard/orders/${order?._id}`}>
              <Button
                className=" px-2 bg-blue-100 text-blue-500 hover:bg-blue-200"
                size="sm"
              >
                <ArrowRightIcon size={16} />
              </Button>
            </Link>
          </>
        }
        tooltipContent="Detatls"
      />
    </div>
  );
}

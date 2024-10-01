'use client';

import { cancelOrderAction } from '@/app/actions/order/order';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CancelOrder({
  orderId,
  userId,
  disabled,
}: {
  orderId: string;
  userId: string;
  disabled: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      setLoading(true);

      const result = await cancelOrderAction(orderId, userId);

      if (result.status === 200) {
        toast.success('Order Cancelled successfully', {
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

  return (
    <ConfirmDialog
      triggerType="cancel-order-user"
      title="Are you sure?"
      description="Are you sure you want to cancel the order?"
      confirmText="Cancel"
      cancelText="No"
      onConfirm={handleDeleteProduct}
      isLoading={loading}
      disabled={disabled}
      triggerText="Cancel"
    />
  );
}

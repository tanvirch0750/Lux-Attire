'use client';

import { Row } from '@tanstack/react-table';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

import { IReview } from '@/db/models/review-model';
import {
  deleteReviewAction,
  undoDeleteReviewAction,
} from '@/app/actions/review/review';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [loading, setLoading] = useState(false);

  const review: IReview = row.original as IReview;

  const handleDeleteReview = async () => {
    try {
      setLoading(true);

      const result = await deleteReviewAction(review?._id as string);

      if (result.status === 200) {
        toast.success('Review deleted successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Review deletion Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUndoDeleteReview = async () => {
    try {
      setLoading(true);

      const result = await undoDeleteReviewAction(review?._id as string);

      if (result.status === 200) {
        toast.success('Review restored successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Review undo deletion Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-[100px] gap-2">
      {review?.isDeleted ? (
        <ConfirmDialog
          triggerType="undo-delete"
          title="Are you sure?"
          description="Are you sure you want to undo deletion for this Review?"
          confirmText="Undo Delete"
          cancelText="Cancel"
          onConfirm={handleUndoDeleteReview}
          isLoading={loading}
        />
      ) : (
        <ConfirmDialog
          triggerType="confirm-delete"
          title="Are you sure?"
          description="Are you sure you want to delete this review?"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteReview}
          isLoading={loading}
        />
      )}
    </div>
  );
}

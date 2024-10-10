import React, { ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  PackageCheckIcon,
  Trash2Icon,
  Undo2Icon,
  XIcon,
} from 'lucide-react';
import { CustomTooltip } from './Tooltip';

interface ConfirmDialogProps {
  triggerType:
    | 'confirm-delete'
    | 'confirm-order'
    | 'undo-delete'
    | 'cancel-order-user'
    | 'cancel-order-admin'
    | 'delivered-order';
  triggerText?: string; // Text for the trigger button
  title: string; // Title of the alert dialog
  description: string; // Description for the dialog
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  onConfirm: () => Promise<void> | void; // Confirm action handler
  isLoading: boolean; // Loading state for the confirm action
  children?: ReactNode; // Optional content (if needed)
  disabled?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  triggerType,
  triggerText,
  title,
  description,
  confirmText = 'Continue',
  cancelText = 'Cancel',
  onConfirm,
  isLoading,
  children,
  disabled = false,
}) => {
  // Manage dialog open/close state
  const [open, setOpen] = useState(false);

  // Handle confirm action with loading and dialog state
  const handleConfirm = async () => {
    try {
      await onConfirm(); // Perform the async action (e.g., delete category)
      setOpen(false); // Close the dialog after success
    } catch (error) {
      // Handle the error if needed
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div>
          <CustomTooltip
            triggerContent={
              <>
                {triggerType === 'confirm-order' && (
                  <Button variant="outline">{triggerText}</Button>
                )}
              </>
            }
            tooltipContent="Confirm Order"
          />

          <CustomTooltip
            triggerContent={
              <>
                {triggerType === 'cancel-order-user' && (
                  <Button variant="destructive" size="sm" disabled={disabled}>
                    {triggerText}
                  </Button>
                )}
              </>
            }
            tooltipContent="Cancel Order"
          />

          <CustomTooltip
            triggerContent={
              <>
                {triggerType === 'cancel-order-admin' && (
                  <Button
                    disabled={disabled}
                    className=" px-2 bg-red-100 text-red-500 hover:bg-red-200"
                    size="sm"
                  >
                    <XIcon size={16} />
                  </Button>
                )}
              </>
            }
            tooltipContent="Cancel Order"
          />

          <CustomTooltip
            triggerContent={
              <>
                {triggerType === 'delivered-order' && (
                  <Button
                    disabled={disabled}
                    className=" px-2 bg-green-100 text-green-700 hover:bg-green-200"
                    size="sm"
                  >
                    <PackageCheckIcon size={16} />
                  </Button>
                )}
              </>
            }
            tooltipContent="Deliver Order"
          />

          <CustomTooltip
            triggerContent={
              <>
                {triggerType === 'confirm-delete' && (
                  <Button
                    className=" px-2 bg-red-100 text-red-500 hover:bg-red-200"
                    size="sm"
                  >
                    <Trash2Icon size={16} />
                  </Button>
                )}
              </>
            }
            tooltipContent="Delete"
          />

          <CustomTooltip
            triggerContent={
              <>
                {triggerType === 'undo-delete' && (
                  <Button
                    className=" px-2 bg-orange-100 text-orange-500 hover:bg-orange-200"
                    size="sm"
                  >
                    <Undo2Icon size={16} />
                  </Button>
                )}
              </>
            }
            tooltipContent="Undo Delete"
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className=" text-md">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className=" mt-8">
          <AlertDialogCancel onClick={() => setOpen(false)}>
            {cancelText}
          </AlertDialogCancel>
          <Button
            className=" bg-red-600 hover:bg-red-500"
            onClick={handleConfirm} // Use the custom confirm handler
            disabled={isLoading}
          >
            {isLoading ? (
              <div className=" flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />{' '}
                <span>Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </Button>
        </AlertDialogFooter>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

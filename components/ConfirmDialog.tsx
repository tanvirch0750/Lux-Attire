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
import { Loader2, Trash2Icon, Undo2Icon } from 'lucide-react';

interface ConfirmDialogProps {
  triggerType: 'confirm-delete' | 'confirm-order' | 'undo-delete';
  triggerText?: string; // Text for the trigger button
  title: string; // Title of the alert dialog
  description: string; // Description for the dialog
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  onConfirm: () => Promise<void> | void; // Confirm action handler
  isLoading: boolean; // Loading state for the confirm action
  children?: ReactNode; // Optional content (if needed)
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
          {triggerType === 'confirm-order' && (
            <Button variant="outline">{triggerText}</Button>
          )}
          {triggerType === 'confirm-delete' && (
            <Button
              className=" px-2 bg-red-100 text-red-500 hover:bg-red-200"
              size="sm"
            >
              <Trash2Icon size={16} />
            </Button>
          )}
          {triggerType === 'undo-delete' && (
            <Button
              className=" px-2 bg-orange-100 text-orange-500 hover:bg-orange-200"
              size="sm"
            >
              <Undo2Icon size={16} />
            </Button>
          )}
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

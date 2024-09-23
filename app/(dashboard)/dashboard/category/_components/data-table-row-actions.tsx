'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit2Icon, Trash2Icon } from 'lucide-react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const category = row.original;

  const handleDeleteCategory = () => {
    console.log('category delete');
  };

  return (
    <div className="flex items-center w-[100px] gap-2">
      {/* <EditCategory category={category} /> */}
      <Button
        className=" px-2 bg-green-100 text-green-500 hover:bg-gray-200"
        size="sm"
        onClick={handleDeleteCategory}
      >
        <Edit2Icon size={16} />
      </Button>
      <Button
        className=" px-2 bg-red-100 text-red-500 hover:bg-red-200"
        size="sm"
        onClick={handleDeleteCategory}
      >
        <Trash2Icon size={16} />
      </Button>
    </div>
  );
}

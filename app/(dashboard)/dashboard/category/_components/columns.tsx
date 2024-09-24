'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { ICategory } from '@/db/models/category-model';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'label',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category Name"
        className=" text-brand text-md"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {row.getValue('label')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category Tag"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {row.getValue('value')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'isDeleted',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Is Deleted"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {row.getValue('isDeleted') ? (
              <Badge className=" bg-red-200 text-red-950 hover:bg-red-100 hover:text-red-700">
                Yes
              </Badge>
            ) : (
              <Badge className=" bg-green-200 text-green-950 hover:bg-green-100 hover:text-green-700">
                No
              </Badge>
            )}
          </span>
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-brand text-md"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

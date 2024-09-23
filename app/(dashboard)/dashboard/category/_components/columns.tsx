'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { ICategory } from '@/db/models/category-model';

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

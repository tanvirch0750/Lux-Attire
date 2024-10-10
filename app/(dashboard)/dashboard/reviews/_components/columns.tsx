'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

import { formatDateAndTime } from '@/lib/utils';

interface IProductFrontend {
  _id: string | null;
  category: string | null;
  name: string | null;
  price: number | null;
  isAvailable: boolean | null;
  image: string | null;
}

export const columns: ColumnDef<IProductFrontend>[] = [
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className=" text-brand text-md"
      />
    ),
    cell: ({ row }) => {
      const email = (row?.getValue('user') as { name: string } | undefined)
        ?.name;

      return (
        <div className="flex space-x-2">
          <div className="max-w-32 text-md">{email}</div>
        </div>
      );
    },
  },

  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rating"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const rating = row?.getValue('rating');
      return (
        <div className="flex space-x-2 text-center">
          <span className="max-w-[100px]  text-md text-center bg-orange-200 text-orange-900 px-2 py-1 rounded-lg">
            {rating as number}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Comment"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const comment = row?.getValue('comment') as string;

      return (
        <div className="flex space-x-2">
          <span className="max-w-[350px] text-md">{comment}</span>
        </div>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt');

      const createdAtString =
        createdAt instanceof Date ? createdAt.toISOString() : createdAt || '';
      const { date } = formatDateAndTime(createdAtString as string);
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] text-md">{date}</span>
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

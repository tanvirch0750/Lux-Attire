'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { ICategory } from '@/db/models/category-model';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

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
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Image"
        className=" text-brand text-md"
      />
    ),
    cell: ({ row }) => {
      const image = row?.getValue('image');

      return (
        <div className="flex space-x-2">
          <div className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            <Image
              src={image as string}
              alt="image src"
              width={90}
              height={120}
              className="rounded-md"
            />
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Product Name"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const category = row?.getValue('category');
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {category as string}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Price"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const price = row?.getValue('price') as number;

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {price}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'isAvailable',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Is Available"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {row.getValue('isAvailable') ? (
              <Badge className=" bg-green-200 text-green-950 hover:bg-green-100 hover:text-green-700">
                Yes
              </Badge>
            ) : (
              <Badge className=" bg-red-200 text-red-950 hover:bg-red-100 hover:text-red-700">
                No
              </Badge>
            )}
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

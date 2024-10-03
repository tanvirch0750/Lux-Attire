'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';

import { IUser } from '@/db/models/user-model';

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
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
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const email = row?.getValue('email');
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {email as string}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const phone = row?.getValue('phone') as string;

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {phone}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Role"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const role = row?.getValue('role') as string;

      return (
        <div className="flex space-x-2">
          <span
            className={`max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md ${
              role === 'admin'
                ? 'bg-green-200 text-green-950  px-2 py-1 rounded-md'
                : 'bg-orange-200 text-orange-950  px-2 py-1 rounded-md'
            }`}
          >
            {role}
          </span>
        </div>
      );
    },
  },

  // {
  //   id: 'actions',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Actions"
  //       className="text-brand text-md"
  //     />
  //   ),
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

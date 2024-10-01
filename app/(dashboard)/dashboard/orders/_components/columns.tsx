'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

import { IOrder } from '@/db/models/order-model';
import { formatDateAndTime } from '@/lib/utils';

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'orderId',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order Id"
        className=" text-brand text-md"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate sm:max-w-72 md:max-w-[31rem] text-md">
            {row.getValue('orderId')}
          </span>
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
      const isoString = row.getValue('createdAt');
      const { date } = formatDateAndTime(isoString as string);

      return <div className="">{date}</div>;
    },
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Time"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const isoString = row.getValue('createdAt');
      const { time } = formatDateAndTime(isoString as string);

      return <div className="">{time}</div>;
    },
  },

  {
    accessorKey: 'totalPrice',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Price"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => (
      <div className="lowercase">${row.getValue('totalPrice')}</div>
    ),
  },

  {
    accessorKey: 'isPaid',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Payment Status"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const isPaid = row.getValue('isPaid');
      return (
        <div className="capitalize">
          <span
            className={`px-2 py-1 rounded ${
              isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isPaid ? 'Paid' : 'Not Paid'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'orderStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Order Status"
        className="text-md text-brand"
      />
    ),
    cell: ({ row }) => {
      const orderStatus: string = row.getValue('orderStatus');

      // Define background color classes based on order status
      let backgroundColorClass = '';
      switch (orderStatus) {
        case 'confirmed':
          backgroundColorClass = 'bg-yellow-200 text-yellow-900 ';
          break;
        case 'delivered':
          backgroundColorClass = 'bg-green-200 text-green-900 ';
          break;
        case 'cancelled':
          backgroundColorClass = 'bg-red-200 text-red-900';
          break;
        default:
          backgroundColorClass = 'bg-gray-200 text-gray-900';
      }

      return (
        <div className={`capitalize `}>
          <span className={`${backgroundColorClass} px-2 py-1 rounded`}>
            {orderStatus}
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

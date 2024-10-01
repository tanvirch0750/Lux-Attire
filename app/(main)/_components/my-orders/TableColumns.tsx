import { Button } from '@/components/ui/button';
import { IOrder } from '@/db/models/order-model';
import { formatDateAndTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import CancelOrder from './CancelOrder';

export const columns: ColumnDef<Partial<IOrder>>[] = [
  {
    accessorKey: 'orderId',
    header: () => <div className="text-right">Order Id</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('orderId')}</div>
      );
    },
  },

  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const isoString = row.getValue('createdAt');
      const { date } = formatDateAndTime(isoString as string);

      return <div className="text-right font-medium">{date}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Time</div>,
    cell: ({ row }) => {
      const isoString = row.getValue('createdAt');
      const { time } = formatDateAndTime(isoString as string);

      return <div className="text-right font-medium">{time}</div>;
    },
  },
  {
    accessorKey: 'totalPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">${row.getValue('totalPrice')}</div>
    ),
  },
  {
    accessorKey: 'isPaid',
    header: 'Payment Status',
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
    header: 'Order Status',
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
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className=" flex gap-2 justify-center">
          <Link href={`/my-orders/${order?._id}`}>
            {' '}
            <Button className=" bg-green-600 hover:bg-green-500" size="sm">
              Details
            </Button>
          </Link>

          {/* <Button
            size="sm"
            variant="destructive"
            disabled={order?.isPaid || order?.orderStatus === 'delivered'}
          >
            Cancel
          </Button> */}

          <CancelOrder
            disabled={
              order?.isPaid ||
              order?.orderStatus === 'delivered' ||
              order?.orderStatus === 'cancelled'
            }
            orderId={order?._id as string}
            userId={order?.user as string}
          />
        </div>
      );
    },
  },
];

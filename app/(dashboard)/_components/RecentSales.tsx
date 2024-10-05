import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRecentOrders } from '@/db/actions-and-queries/orders/orders-queries';

// Define the type for the Order
interface Order {
  _id: string;
  email: string;
  orderItems: {
    name: string;
    totalPrice: number;
  }[];
  user: {
    name: string;
    email: string;
  };
}

export async function RecentSales() {
  const recentOrders = await getRecentOrders();

  return (
    <div className="space-y-8">
      {recentOrders?.map((order: Order) => (
        <div key={order._id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/path/to/avatar.png" alt="Avatar" />{' '}
            {/* Replace with dynamic image path if available */}
            <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>{' '}
            {/* Use first letter of the user's name */}
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.user.name}
            </p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
          </div>
          <div className="ml-auto font-medium">
            +$
            {order.orderItems
              .reduce((total, item) => total + item.totalPrice, 0)
              .toFixed(2)}{' '}
            {/* Calculate total price */}
          </div>
        </div>
      ))}
    </div>
  );
}

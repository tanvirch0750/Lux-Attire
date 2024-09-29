import { auth } from '@/auth';
import Checkout from '../_components/checkout/Checkout';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';

export default async function CheckoutPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <div className="border-t p-[24px]">
      <Checkout user={user} />
    </div>
  );
}

import { IOrderItem } from '@/db/models/order-model';
import { AddaReview } from './AddReview';
import { getReviewByProductAndUser } from '@/db/actions-and-queries/reviews/review-query';
import { EditReview } from './EditReview';

export default async function GiveReview({
  product,
  user,
  order,
}: {
  product: IOrderItem;
  user: string;
  order: string;
}) {
  const review = await getReviewByProductAndUser(
    product?.productId as string,
    user,
    order
  );

  const isReviw = review === 'review-error' ? false : true;

  console.log('product review', review);

  return (
    <div className=" flex justify-end">
      {isReviw ? (
        <>
          <EditReview
            product={product}
            user={user}
            order={order}
            review={review}
          />
        </>
      ) : (
        <>
          <AddaReview product={product} user={user} order={order} />
        </>
      )}
    </div>
  );
}

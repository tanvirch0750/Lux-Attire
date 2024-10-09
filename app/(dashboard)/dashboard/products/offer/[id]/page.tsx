import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import ProductOffersForm from '../../_components/ProductOfferForm';
import { getProductByIdAdmin } from '@/db/actions-and-queries/products/products-queries';

export default async function OfferPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductByIdAdmin(params?.id);

  return (
    <PageContainer>
      <div>
        <ProductOffersForm
          productId={params?.id}
          defaultOffers={product?.offers}
          name={product?.name}
        />
      </div>
    </PageContainer>
  );
}

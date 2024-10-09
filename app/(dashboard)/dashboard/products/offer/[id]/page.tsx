import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import PageHeader from '@/app/(dashboard)/_components/PageHeader';
import ProductOffersForm from '../../_components/ProductOfferForm';

export default function OfferPage({ params }: { params: { id: string } }) {
  return (
    <PageContainer>
      <PageHeader
        btnLabel="Product List"
        btnLink="/dashboard/products"
        heading="Update Offer"
      />
      <div>
        <ProductOffersForm productId={params?.id} />
      </div>
    </PageContainer>
  );
}

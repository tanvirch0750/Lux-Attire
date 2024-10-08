import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';

import { getShippingSettings } from '@/db/actions-and-queries/settings/settings-query';
import UpdateShippingForm from '../_components/UpdateShippingForm';

export default async function EditSetting() {
  const shippingData = await getShippingSettings();

  console.log('shipping data', shippingData);
  return (
    <PageContainer>
      <UpdateShippingForm defaultShippingData={shippingData} />
    </PageContainer>
  );
}

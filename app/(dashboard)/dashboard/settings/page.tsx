import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCardIcon, HandshakeIcon, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getShippingSettings } from '@/db/actions-and-queries/settings/settings-query';
import { IShippingMethod } from '@/db/models/settings-model';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const shippingData = await getShippingSettings();

  return (
    <PageContainer>
      <PageHeader heading="Settings" />

      <div>
        <Card className="max-w-[380px]">
          <CardHeader>
            <CardTitle>Shipping Price</CardTitle>
            <CardDescription>You have 2 shipping method.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {shippingData?.map((item: IShippingMethod) => (
              <div
                key={item?._id}
                className=" flex items-center space-x-4 rounded-md border p-4"
              >
                <CreditCardIcon />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    With {item?.shippingMethod}
                  </p>
                </div>
                <span>{item?.price}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-brand hover:bg-brand/90">
              <PencilIcon className="mr-2 h-4 w-4 " /> Update Shipping Price
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}

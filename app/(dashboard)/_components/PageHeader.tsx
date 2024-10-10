import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PageHeader({
  heading,
  btnLabel,
  btnLink,
}: {
  heading: string;
  btnLabel?: string;
  btnLink?: string;
}) {
  return (
    <div className=" flex justify-between items-center pb-8">
      <h2 className=" text-primary text-2xl">{heading}</h2>

      {btnLink && (
        <Link href={btnLink as string}>
          {' '}
          <Button className=" bg-orange-100 text-brand font-semibold text-md hover:bg-orange-200">
            {btnLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}

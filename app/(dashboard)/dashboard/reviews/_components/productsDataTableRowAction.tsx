'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TProduct } from '@/db/models/product-model';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ProductDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const products: TProduct = row.original as TProduct;

  return (
    <div className="flex items-center w-[100px] gap-2">
      <Link href={`/dashboard/reviews/${products?._id}`}>
        <Button
          className=" px-2 bg-green-100 text-green-800 hover:bg-gray-200"
          size="sm"
        >
          See Reviews
        </Button>
      </Link>
    </div>
  );
}

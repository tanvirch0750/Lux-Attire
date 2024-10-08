'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationDemoProps {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export default function PaginationDemo({
  currentPage,
  totalPages,
  limit,
}: PaginationDemoProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    params.set('limit', limit.toString());

    // Update URL without full reload
    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageLink(i));
      }
    } else {
      pageNumbers.push(renderPageLink(1));
      if (currentPage > 3) {
        pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderPageLink(i));
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      pageNumbers.push(renderPageLink(totalPages));
    }

    return pageNumbers;
  };

  const renderPageLink = (page: number) => (
    <PaginationItem key={page}>
      <PaginationLink
        href="#"
        isActive={currentPage === page}
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(page);
        }}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );

  return (
    <div className="flex justify-end mt-8 mb-4">
      <Pagination>
        <PaginationContent className="bg-white shadow-md rounded-lg p-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={`${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationPrevious>
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={`${
                currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

import { Button } from '@priyang/react-component-lib';
import { useSearchParams } from 'react-router';

type PaginationProps = {
  totalPages: number;
};

export const perPage = 2;

export function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handleSetPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams); // clone existing params
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="border-primary-400 mt-4 flex gap-2 rounded-3xl border-3 border-solid p-5">
      <Button
        disabled={currentPage <= 1}
        onClick={() => handleSetPage(currentPage - 1)}
        className="rounded border px-2 py-1 disabled:opacity-50"
      >
        ◀
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => handleSetPage(page)}
          variant={page === currentPage ? 'primary' : 'primary-border'}
          className={`rounded border px-3 py-1`}
        >
          {page}
        </Button>
      ))}

      <Button
        disabled={currentPage >= totalPages}
        onClick={() => handleSetPage(currentPage + 1)}
        className="rounded border px-2 py-1 disabled:opacity-50"
      >
        ▶
      </Button>
    </div>
  );
}

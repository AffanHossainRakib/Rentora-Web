import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

type TablePaginationProps = {
  meta: IMeta;
  basePath: string;
  query?: Record<string, string | undefined>;
};

const hrefFor = (
  basePath: string,
  query: Record<string, string | undefined> | undefined,
  page: number,
) => {
  const params = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value && key !== "page") params.set(key, value);
  });

  params.set("page", String(page));

  return `${basePath}?${params.toString()}`;
};

export function TablePagination({
  meta,
  basePath,
  query,
}: TablePaginationProps) {
  if (meta.totalPage <= 1) return null;

  const pages = Array.from(
    { length: meta.totalPage },
    (_, index) => index + 1,
  ).filter(
    (page) =>
      page === 1 || page === meta.totalPage || Math.abs(page - meta.page) <= 1,
  );

  const hasPrevious = meta.page > 1;
  const hasNext = meta.page < meta.totalPage;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              hasPrevious ? hrefFor(basePath, query, meta.page - 1) : undefined
            }
            aria-disabled={!hasPrevious}
            tabIndex={hasPrevious ? undefined : -1}
            className={cn(!hasPrevious && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={page}>
            {index > 0 && pages[index - 1] !== page - 1 && (
              <span className="px-2">…</span>
            )}
            <PaginationLink
              href={hrefFor(basePath, query, page)}
              isActive={page === meta.page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={hasNext ? hrefFor(basePath, query, meta.page + 1) : undefined}
            aria-disabled={!hasNext}
            tabIndex={hasNext ? undefined : -1}
            className={cn(!hasNext && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

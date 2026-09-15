import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { IMeta } from "@/lib/types";

type PropertyPaginationProps = {
  meta: IMeta;
  query: Record<string, string | undefined>;
};

const hrefFor = (query: Record<string, string | undefined>, page: number) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value && key !== "page" && key !== "limit") params.set(key, value);
  });

  params.set("page", String(page));

  return `/properties?${params.toString()}`;
};

export function PropertyPagination({ meta, query }: PropertyPaginationProps) {
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
            href={hasPrevious ? hrefFor(query, meta.page - 1) : undefined}
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
              href={hrefFor(query, page)}
              isActive={page === meta.page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={hasNext ? hrefFor(query, meta.page + 1) : undefined}
            aria-disabled={!hasNext}
            tabIndex={hasNext ? undefined : -1}
            className={cn(!hasNext && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

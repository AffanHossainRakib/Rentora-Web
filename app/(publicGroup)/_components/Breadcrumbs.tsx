import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export type IBreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: IBreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground"
    >
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <ChevronRight className="size-3.5 shrink-0" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

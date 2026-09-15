import { PaymentStatusBadge } from "@/app/(dashboardGroup)/_components/StatusBadge";
import { TablePagination } from "@/app/(dashboardGroup)/_components/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate, propertyHref } from "@/lib/utils";
import Link from "next/link";
import { getMyPayments } from "../_actions/tenantActions";

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function TenantPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = first(params.page) ?? "1";

  const result = await getMyPayments({ page, limit: "10" });
  const payments = result.success ? result.data.payments : [];
  const meta = result.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
        <p className="text-muted-foreground">
          All payments you&apos;ve made on Rentora.
        </p>
      </div>

      {payments.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No payments yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {payment.rentalRequest?.property ? (
                      <Link
                        href={propertyHref(payment.rentalRequest.property)}
                        className="font-medium hover:underline"
                      >
                        {payment.rentalRequest.property.title}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(payment.amount, payment.currency)}
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell>
                    {payment.paidAt ? formatDate(payment.paidAt) : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {meta && (
        <TablePagination meta={meta} basePath="/tenant-dashboard/payments" />
      )}
    </div>
  );
}

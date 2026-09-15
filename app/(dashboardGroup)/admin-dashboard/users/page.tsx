import { TablePagination } from "@/app/(dashboardGroup)/_components/TablePagination";
import { getMe } from "@/service/getMe";
import { getAllUsers } from "../_actions/adminActions";
import { UserFilters } from "./_components/UserFilters";
import { UsersTable } from "./_components/UsersTable";

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const searchTerm = first(params.searchTerm);
  const role = first(params.role);
  const page = first(params.page) ?? "1";

  const [result, currentUser] = await Promise.all([
    getAllUsers({ searchTerm, role, page, limit: "10" }),
    getMe(),
  ]);

  const users = result.success ? result.data.users : [];
  const meta = result.meta;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage tenant, landlord and admin accounts.</p>
      </div>

      <UserFilters />

      {users.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No users found.</p>
      ) : (
        <UsersTable users={users} currentUserId={currentUser?.id ?? ""} />
      )}

      {meta && (
        <TablePagination
          meta={meta}
          basePath="/admin-dashboard/users"
          query={{ searchTerm, role }}
        />
      )}
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/lib/types";
import { formatDate, getInitials, isValidImageUrl } from "@/lib/utils";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { updateUserStatus } from "../_actions/userActions";

export function UsersTable({
  users,
  currentUserId,
}: {
  users: IUser[];
  currentUserId: string;
}) {
  const [optimisticUsers, setOptimisticStatus] = useOptimistic(
    users,
    (state, update: { id: string; isActive: boolean }) =>
      state.map((user) =>
        user.id === update.id ? { ...user, isActive: update.isActive } : user,
      ),
  );
  const [, startTransition] = useTransition();

  const handleToggle = (id: string, nextActive: boolean) => {
    startTransition(async () => {
      setOptimisticStatus({ id, isActive: nextActive });
      const result = await updateUserStatus(id, nextActive);

      if (result.success) {
        toast.success(nextActive ? "User unbanned" : "User banned");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    {isValidImageUrl(user.profile?.profilePicture) && (
                      <AvatarImage
                        src={user.profile!.profilePicture!}
                        alt={user.name}
                      />
                    )}
                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.isActive ? "default" : "destructive"}>
                  {user.isActive ? "Active" : "Banned"}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={user.id === currentUserId}
                  onClick={() => handleToggle(user.id, !user.isActive)}
                >
                  {user.isActive ? "Ban" : "Unban"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

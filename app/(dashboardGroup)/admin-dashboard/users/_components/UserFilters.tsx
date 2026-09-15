"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function UserFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") ?? "",
  );
  const [role, setRole] = useState(searchParams.get("role") ?? "all");

  const applyParams = (nextSearchTerm: string, nextRole: string) => {
    const params = new URLSearchParams();
    if (nextSearchTerm) params.set("searchTerm", nextSearchTerm);
    if (nextRole !== "all") params.set("role", nextRole);
    router.push(`/admin-dashboard/users?${params.toString()}`);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    applyParams(searchTerm, value);
  };

  const handleSearchCommit = () => {
    applyParams(searchTerm, role);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSearchCommit();
        }}
        onBlur={handleSearchCommit}
        className="max-w-xs"
      />
      <Select value={role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All roles</SelectItem>
          <SelectItem value="TENANT">Tenant</SelectItem>
          <SelectItem value="LANDLORD">Landlord</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

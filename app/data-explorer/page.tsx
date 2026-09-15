"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import TopNav from "@/app/components/TopNav";
import DataTable from "@/app/components/DataTable";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  role: string;
  requestsPerMin: number;
}

const sampleData: User[] = [
  {
    id: "USR-001",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    status: "active",
    joinDate: "2026-01-15",
    role: "Administrator",
    requestsPerMin: 245,
  },
  {
    id: "USR-002",
    name: "Bob Smith",
    email: "bob.smith@company.com",
    status: "active",
    joinDate: "2026-02-20",
    role: "Developer",
    requestsPerMin: 189,
  },
  {
    id: "USR-003",
    name: "Carol Williams",
    email: "carol.williams@company.com",
    status: "active",
    joinDate: "2026-01-08",
    role: "Manager",
    requestsPerMin: 156,
  },
  {
    id: "USR-004",
    name: "David Brown",
    email: "david.brown@company.com",
    status: "pending",
    joinDate: "2026-04-20",
    role: "Analyst",
    requestsPerMin: 0,
  },
  {
    id: "USR-005",
    name: "Eve Davis",
    email: "eve.davis@company.com",
    status: "inactive",
    joinDate: "2025-12-10",
    role: "Developer",
    requestsPerMin: 0,
  },
  {
    id: "USR-006",
    name: "Frank Miller",
    email: "frank.miller@company.com",
    status: "active",
    joinDate: "2026-03-05",
    role: "Administrator",
    requestsPerMin: 312,
  },
];

export default function DataExplorerPage() {
  const [data] = useState<User[]>(sampleData);

  const columns = [
    {
      key: "id",
      label: "User ID",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: false,
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: unknown) => {
        const status = value as "active" | "inactive" | "pending";
        const statusColors = {
          active: "bg-accent-success/20 text-accent-success",
          inactive: "bg-muted/20 text-muted",
          pending: "bg-primary/20 text-primary",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
    },
    {
      key: "requestsPerMin",
      label: "Requests/Min",
      sortable: true,
      render: (value: unknown) => {
        const count = value as number;
        return (
          <span className={count > 0 ? "text-accent-success" : "text-muted"}>
            {count}
          </span>
        );
      },
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-dark">
      <Sidebar />

      <main className="flex-1 ml-60 flex flex-col">
        <TopNav />

        <div className="p-8 flex flex-col gap-8 overflow-y-auto">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Data Explorer
            </h1>
            <p className="text-muted">Browse and analyze system data</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-lg">
              <p className="text-muted text-sm mb-2">Total Records</p>
              <p className="text-2xl font-bold text-text-primary">
                {data.length}
              </p>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <p className="text-muted text-sm mb-2">Active Users</p>
              <p className="text-2xl font-bold text-accent-success">
                {data.filter((u) => u.status === "active").length}
              </p>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <p className="text-muted text-sm mb-2">Pending</p>
              <p className="text-2xl font-bold text-primary">
                {data.filter((u) => u.status === "pending").length}
              </p>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <p className="text-muted text-sm mb-2">Inactive</p>
              <p className="text-2xl font-bold text-muted">
                {data.filter((u) => u.status === "inactive").length}
              </p>
            </div>
          </div>

          {/* Data Table */}
          <div className="glass-panel p-6 rounded-xl">
            <h2 className="text-xl font-bold text-text-primary mb-4">Users</h2>
            <DataTable
              columns={columns}
              data={data as unknown as Record<string, unknown>[]}
              emptyMessage="No users found"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

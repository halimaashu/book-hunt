import { getUsers } from "@/lib/data";
import { Table } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiSearch,
  FiX,
  FiLock,
  FiAlertCircle,
} from "react-icons/fi";

const roleFilters = [
  { label: "All", value: "" },
  { label: "Admins", value: "admin" },
  { label: "Users", value: "user" },
];

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const query = params?.query?.toString().trim() || "";
  const role = params?.role?.toString() || "";

  const allUsers = (await getUsers()) || [];

  // Stats use all users, the table uses the filtered list
  const adminCount = allUsers.filter((u) => u.role === "admin").length;
  const verifiedCount = allUsers.filter((u) => u.emailVerified).length;

  const users = allUsers.filter((u) => {
    const matchesRole = role ? (u.role || "user") === role : true;
    const q = query.toLowerCase();
    const matchesQuery = q
      ? u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
      : true;
    return matchesRole && matchesQuery;
  });

  const stats = [
    { label: "Total users", value: allUsers.length, icon: FiUsers, color: "bg-blue-100 text-blue-600" },
    { label: "Admins", value: adminCount, icon: FiShield, color: "bg-red-100 text-red-600" },
    { label: "Verified emails", value: verifiedCount, icon: FiCheckCircle, color: "bg-green-100 text-green-600" },
  ];

  const filterHref = (value) => {
    const qs = new URLSearchParams();
    if (value) qs.set("role", value);
    if (query) qs.set("query", query);
    const str = qs.toString();
    return str ? `/dashboard/admin/users?${str}` : "/dashboard/admin/users";
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Users
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          See everyone who has an account on BooksHunt.
        </p>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${color}`}>
              <Icon />
            </span>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          {roleFilters.map((f) => (
            <Link
              key={f.label}
              href={filterHref(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                role === f.value
                  ? "bg-green-600 text-white shadow-md shadow-green-200"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Plain GET form: works in a server component with no JavaScript */}
        <form
          method="get"
          className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm lg:max-w-sm"
        >
          {role && <input type="hidden" name="role" value={role} />}
          <FiSearch className="ml-3 shrink-0 text-lg text-slate-400" />
          <input
            name="query"
            type="text"
            defaultValue={query}
            placeholder="Search by name or email..."
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </section>

      {/* Table */}
      {users.length > 0 ? (
        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="All users table" className="min-w-[760px]">
                <Table.Header>
                  <Table.Column isRowHeader>User</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column>Email status</Table.Column>
                  <Table.Column>2FA</Table.Column>
                  <Table.Column>Language</Table.Column>
                  <Table.Column>Joined</Table.Column>
                </Table.Header>

                <Table.Body>
                  {users.map((user) => {
                    const isAdmin = user.role === "admin";
                    const id = String(user._id);
                    return (
                      <Table.Row key={id} id={id}>
                        {/* User: avatar, name, email */}
                        <Table.Cell>
                          <div className="flex items-center gap-3 py-1">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-600 font-bold text-white">
                              {user.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={user.image}
                                  alt={user.name || "User"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                (user.name || "U")[0].toUpperCase()
                              )}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">
                                {user.name}
                              </p>
                              <p className="truncate text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Role */}
                        <Table.Cell>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              isAdmin
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {isAdmin ? "Admin" : "User"}
                          </span>
                        </Table.Cell>

                        {/* Email verified */}
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                              user.emailVerified ? "text-green-600" : "text-amber-600"
                            }`}
                          >
                            {user.emailVerified ? <FiCheckCircle /> : <FiAlertCircle />}
                            {user.emailVerified ? "Verified" : "Not verified"}
                          </span>
                        </Table.Cell>

                        {/* 2FA */}
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                              user.two_factor_enabled ? "text-green-600" : "text-slate-400"
                            }`}
                          >
                            <FiLock />
                            {user.two_factor_enabled ? "On" : "Off"}
                          </span>
                        </Table.Cell>

                        {/* Language */}
                        <Table.Cell>
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-600">
                            {user.lang || "en"}
                          </span>
                        </Table.Cell>

                        {/* Joined */}
                        <Table.Cell>
                          <span className="text-sm text-slate-600">
                            {formatDate(user.createdAt)}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            <Table.Footer>
              <p className="px-5 py-4 text-sm text-slate-500">
                Showing <span className="font-bold text-slate-900">{users.length}</span> of{" "}
                {allUsers.length} users
              </p>
            </Table.Footer>
          </Table>
        </section>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
            <FiSearch />
          </span>
          <h2 className="mt-5 text-lg font-bold text-slate-900">No users found</h2>
          <p className="mt-2 text-sm text-slate-500">
            Try a different name or email, or clear the filters.
          </p>
          <Link
            href="/dashboard/admin/users"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FiX />
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
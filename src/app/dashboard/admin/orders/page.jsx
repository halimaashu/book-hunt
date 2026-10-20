import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Table } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  FiShoppingBag,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiX,
  FiPhone,
  FiAlertCircle,
  FiEye,
} from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";

export const metadata = {
  title: "Orders | BooksHunt admin",
};

const statusFilters = [
  { label: "All", value: "" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
];

// "district:gaibandha thana:sundorjanj address:moniram falghaca"  ->  readable text
function parseAddress(text = "") {
  const m = /district:(.*?)\s+thana:(.*?)\s+address:(.*)/i.exec(text);
  if (!m) return text.trim();
  const [, district, thana, address] = m.map((x) => x.trim());
  return [address, thana, district].filter(Boolean).join(", ");
}

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const formatTime = (date) =>
  date
    ? new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

const num = (n) => Number(n || 0).toLocaleString("en-US");

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const query = params?.query?.toString().trim() || "";
  const status = params?.status?.toString() || "";

  // Admin only (checked on the server)
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  // Load all orders
  let allOrders = [];
  let loadError = false;
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });
    console.log(token,"from ADDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Request failed");
    const json = await res.json();
    allOrders = Array.isArray(json)
      ? json
      : Array.isArray(json?.data)
        ? json.data
        : [];
  } catch {
    loadError = true;
  }

  // Newest first
  allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalOf = (o) => Number(o.price || 0) * Number(o.quantity || 1);
  const paidCount = allOrders.filter((o) => o.isPaid).length;
  const pendingCount = allOrders.length - paidCount;
  const revenue = allOrders
    .filter((o) => o.isPaid)
    .reduce((sum, o) => sum + totalOf(o), 0);

  const orders = allOrders.filter((o) => {
    const matchesStatus =
      status === "paid" ? o.isPaid : status === "pending" ? !o.isPaid : true;
    const q = query.toLowerCase();
    const matchesQuery = q
      ? [o.name, o.email, o.phone, o.bookTitle, o.transitionId, o.tran_id]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      : true;
    return matchesStatus && matchesQuery;
  });

  const stats = [
    {
      label: "Total orders",
      value: allOrders.length,
      icon: FiShoppingBag,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      label: "Paid",
      value: paidCount,
      icon: FiCheckCircle,
      color:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: FiClock,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    },
    {
      label: "Revenue (paid)",
      value: `৳${num(revenue)}`,
      icon: FiCheckCircle,
      color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    },
  ];

  const filterHref = (value) => {
    const qs = new URLSearchParams();
    if (value) qs.set("status", value);
    if (query) qs.set("query", query);
    const str = qs.toString();
    return str ? `/dashboard/admin/orders?${str}` : "/dashboard/admin/orders";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          All orders placed on BooksHunt, newest first.
        </p>
      </div>

      {loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          <FiAlertCircle className="mt-0.5 shrink-0 text-xl" />
          Could not load the orders. Check that your API is running and try
          again.
        </div>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${color}`}
            >
              <Icon />
            </span>
            <p className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              {value}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              {label}
            </p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <Link
              key={f.label}
              href={filterHref(f.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                status === f.value
                  ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-900/40"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-slate-300 dark:hover:border-green-500 dark:hover:text-green-400"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        <form
          method="get"
          className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 lg:max-w-md"
        >
          {status && <input type="hidden" name="status" value={status} />}
          <FiSearch className="ml-3 shrink-0 text-lg text-slate-400" />
          <input
            name="query"
            type="text"
            defaultValue={query}
            placeholder="Search name, email, phone, book or ID..."
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Search
          </button>
        </form>
      </section>

      {/* Table */}
      {orders.length > 0 ? (
        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="All orders table"
                className="min-w-[1040px]"
              >
                <Table.Header>
                  <Table.Column isRowHeader>Order</Table.Column>
                  <Table.Column>Customer</Table.Column>
                  <Table.Column>Book</Table.Column>
                  <Table.Column>Total</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Delivery address</Table.Column>
                  <Table.Column>View</Table.Column>
                </Table.Header>

                <Table.Body>
                  {orders.map((o) => {
                    const tranId = String(o.transitionId || o.tran_id || o._id);
                    return (
                      <Table.Row key={String(o._id)} id={String(o._id)}>
                        {/* Order: date and short id */}
                        <Table.Cell>
                          <div className="py-1">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {formatDate(o.createdAt)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {formatTime(o.createdAt)}
                            </p>
                            <p
                              title={tranId}
                              className="mt-1 font-mono text-xs text-slate-400 dark:text-slate-500"
                            >
                              #{tranId.slice(-8)}
                            </p>
                          </div>
                        </Table.Cell>

                        {/* Customer */}
                        <Table.Cell>
                          <div className="min-w-0 max-w-[220px] py-1">
                            <p className="truncate font-semibold text-slate-900 dark:text-white">
                              {o.name}
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {o.email}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                              <FiPhone className="shrink-0" />
                              {o.phone}
                            </p>
                          </div>
                        </Table.Cell>

                        {/* Book */}
                        <Table.Cell>
                          <div className="min-w-0 max-w-[200px]">
                            <p className="truncate font-semibold text-slate-900 dark:text-white">
                              {o.bookTitle}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {o.quantity} × ৳{num(o.price)}
                            </p>
                          </div>
                        </Table.Cell>

                        {/* Total */}
                        <Table.Cell>
                          <span className="inline-flex items-center text-sm font-bold text-slate-900 dark:text-white">
                            <TbCurrencyTaka className="text-lg" />
                            {num(totalOf(o))}
                          </span>
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                              o.isPaid
                                ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                            }`}
                          >
                            {o.isPaid ? <FiCheckCircle /> : <FiClock />}
                            {o.isPaid ? "Paid" : "Pending"}
                          </span>
                        </Table.Cell>

                        {/* Address */}
                        <Table.Cell>
                          <p
                            className="max-w-[240px] truncate text-sm text-slate-600 dark:text-slate-300"
                            title={parseAddress(o.properAddress)}
                          >
                            {parseAddress(o.properAddress)}
                          </p>
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell>
                          <Link
                            href={`/book/${o.bookId}`}
                            aria-label={`View ${o.bookTitle}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:bg-zinc-800 dark:text-slate-300 dark:hover:bg-white dark:hover:text-slate-900"
                          >
                            <FiEye />
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            <Table.Footer>
              <p className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-slate-900 dark:text-white">
                  {orders.length}
                </span>{" "}
                of {allOrders.length} orders
              </p>
            </Table.Footer>
          </Table>
        </section>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400 dark:bg-zinc-800">
            <FiSearch />
          </span>
          <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            {allOrders.length === 0 ? "No orders yet" : "No orders found"}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {allOrders.length === 0
              ? "Orders will appear here when customers buy books."
              : "Try a different search or clear the filters."}
          </p>
          {allOrders.length > 0 && (
            <Link
              href="/dashboard/admin/orders"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              <FiX />
              Clear filters
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default page;

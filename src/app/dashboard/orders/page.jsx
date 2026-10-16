import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  FiShoppingBag,
  FiCheckCircle,
  FiClock,
  FiBookOpen,
  FiMapPin,
  FiPhone,
  FiHash,
  FiCalendar,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";

export const metadata = {
  title: "My orders | BooksHunt",
};

const filters = [
  { label: "All", value: "" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
];

// "district:gaibandha thana:sundorjanj address:moniram falghaca"  ->  readable parts
function parseAddress(text = "") {
  const m = /district:(.*?)\s+thana:(.*?)\s+address:(.*)/i.exec(text);
  if (!m) return text.trim();
  const [, district, thana, address] = m.map((x) => x.trim());
  return [address, thana, district].filter(Boolean).join(", ");
}

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "N/A";

const money = (n) => `৳${Number(n || 0).toLocaleString("en-US")}`;

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const status = params?.status?.toString() || "";

  // Logged-out visitors go to login (the old code crashed on session.user)
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) redirect("/login");

  // Load this user's orders
  let orders = [];
  let loadError = false;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}order/${encodeURIComponent(user.email)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Request failed");
    const json = await res.json();
    orders = Array.isArray(json?.data) ? json.data : [];
  } catch {
    loadError = true;
  }

  // Newest first
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalOf = (o) => Number(o.price || 0) * Number(o.quantity || 1);
  const paidOrders = orders.filter((o) => o.isPaid);
  const pendingOrders = orders.filter((o) => !o.isPaid);
  const totalSpent = paidOrders.reduce((sum, o) => sum + totalOf(o), 0);

  const visible =
    status === "paid" ? paidOrders : status === "pending" ? pendingOrders : orders;

  const stats = [
    { label: "Total orders", value: orders.length, icon: FiShoppingBag, color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400" },
    { label: "Paid", value: paidOrders.length, icon: FiCheckCircle, color: "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" },
    { label: "Pending", value: pendingOrders.length, icon: FiClock, color: "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400" },
    { label: "Total spent", value: money(totalSpent), icon: FiBookOpen, color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          My orders
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track every book you have ordered from BooksHunt.
        </p>
      </div>

      {loadError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          <FiAlertCircle className="mt-0.5 shrink-0 text-xl" />
          We could not load your orders right now. Please refresh the page or try again later.
        </div>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${color}`}>
              <Icon />
            </span>
            <p className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{label}</p>
          </div>
        ))}
      </section>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/dashboard/orders?status=${f.value}` : "/dashboard/orders"}
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

      {/* Orders */}
      {visible.length > 0 ? (
        <section className="space-y-4">
          {visible.map((order) => {
            const total = totalOf(order);
            const tranId = order.transitionId || order.tran_id;
            return (
              <article
                key={order._id}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:shadow-black/40 sm:p-6"
              >
                {/* Top row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600 dark:bg-green-500/20 dark:text-green-400">
                      <FiBookOpen />
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                        {order.bookTitle}
                      </h2>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                        <FiCalendar className="shrink-0" />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        order.isPaid
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                      }`}
                    >
                      {order.isPaid ? <FiCheckCircle /> : <FiClock />}
                      {order.isPaid ? "Paid" : "Payment pending"}
                    </span>
                    <p className="text-xl font-extrabold text-[#e7000b] dark:text-red-400">{money(total)}</p>
                  </div>
                </div>

                {/* Details */}
                <dl className="mt-5 grid gap-4 border-t border-slate-100 pt-5 text-sm dark:border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-xs font-medium text-slate-400 dark:text-slate-500">Quantity</dt>
                    <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {order.quantity} × {money(order.price)}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <FiPhone /> Phone
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{order.phone}</dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <FiMapPin /> Delivery address
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {parseAddress(order.properAddress)}
                    </dd>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-4">
                    <dt className="flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <FiHash /> Transaction ID
                    </dt>
                    <dd className="mt-1 break-all font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {tranId}
                    </dd>
                  </div>
                </dl>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/book/${order.bookId}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:bg-green-700 dark:shadow-green-900/40"
                  >
                    View book
                    <FiArrowRight />
                  </Link>
                  {!order.isPaid && (
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      This payment was not completed. Place a new order to buy this book.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-950">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400 dark:bg-zinc-800">
            <FiShoppingBag />
          </span>
          <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
            {orders.length === 0 ? "No orders yet" : "No orders in this filter"}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {orders.length === 0
              ? "When you buy a book, your order will show up here."
              : "Try another filter to see your other orders."}
          </p>
          <Link
            href={orders.length === 0 ? "/allBooks" : "/dashboard/orders"}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e7000b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            {orders.length === 0 ? "Browse books" : "Show all orders"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
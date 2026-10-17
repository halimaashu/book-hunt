import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Table } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiPhoneCall,
  FiSearch,
  FiX,
  FiAlertCircle,
  FiLayers,
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiMail,
} from "react-icons/fi";

export const metadata = {
  title: "Polytechnic orders | BooksHunt admin",
};

const publisherFilters = [
  "",
  "Haq Publication",
  "Technical Publication",
  "Standard Publication",
];

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

// 01975665249 -> 8801975665249 (the format WhatsApp links need)
const whatsappNumber = (phone = "") => {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return `88${digits}`;
  return `880${digits}`;
};

const callHref = (phone = "") => `tel:${String(phone).replace(/[^\d+]/g, "")}`;

const priceText = (total) =>
  Number(total) > 0 ? `৳${Number(total).toLocaleString("en-US")}` : null;

// Call and WhatsApp buttons, used in the table and in the phone cards
function ContactButtons({ phone, name, full = false }) {
  return (
    <div
      className={full ? "grid grid-cols-2 gap-3" : "flex items-center gap-2"}
    >
      <a
        href={callHref(phone)}
        aria-label={`Call ${name}`}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white shadow-md shadow-green-200 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:shadow-green-900/40 ${
          full ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"
        }`}
      >
        <FiPhoneCall />
        {full ? "Call" : phone}
      </a>
      <a
        href={`https://wa.me/${whatsappNumber(phone)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${name}`}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-100 font-semibold text-emerald-700 transition hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30 ${
          full ? "px-4 py-3 text-sm" : "h-9 w-9 text-lg"
        }`}
      >
        <FaWhatsapp />
        {full && "WhatsApp"}
      </a>
    </div>
  );
}

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const query = params?.query?.toString().trim() || "";
  const publisher = params?.publisher?.toString() || "";

  // Admin only (checked on the server)
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");

  // Load all polytechnic orders
  let allOrders = [];
  let loadError = false;
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}polytechnic`, {
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

  const today = new Date().toDateString();
  const todayCount = allOrders.filter(
    (o) => new Date(o.createdAt).toDateString() === today,
  ).length;
  const totalSets = allOrders.reduce(
    (sum, o) => sum + Number(o.quantity || 0),
    0,
  );
  const departmentCount = new Set(
    allOrders.map((o) => o.department).filter(Boolean),
  ).size;

  const orders = allOrders.filter((o) => {
    const matchesPublisher = publisher ? o.publisher === publisher : true;
    const q = query.toLowerCase();
    const matchesQuery = q
      ? [o.name, o.phone, o.email, o.department, o.district, o.thana]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      : true;
    return matchesPublisher && matchesQuery;
  });

  const stats = [
    {
      label: "Total orders",
      value: allOrders.length,
      icon: FiLayers,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      label: "Sets ordered",
      value: totalSets,
      icon: FiBookOpen,
      color:
        "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },
    {
      label: "Orders today",
      value: todayCount,
      icon: FiCalendar,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    },
    {
      label: "Departments",
      value: departmentCount,
      icon: FiLayers,
      color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    },
  ];

  const filterHref = (value) => {
    const qs = new URLSearchParams();
    if (value) qs.set("publisher", value);
    if (query) qs.set("query", query);
    const str = qs.toString();
    return str
      ? `/dashboard/admin/polytechnic?${str}`
      : "/dashboard/admin/polytechnic";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Polytechnic book set orders poly pilot
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tap Call to phone the customer, or WhatsApp to message them.
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
      <section className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="min-w-0 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
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
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {publisherFilters.map((p) => (
            <Link
              key={p || "all"}
              href={filterHref(p)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                publisher === p
                  ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-900/40"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-slate-300 dark:hover:border-green-500 dark:hover:text-green-400"
              }`}
            >
              {p || "All publishers"}
            </Link>
          ))}
        </div>

        <form
          method="get"
          className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 lg:max-w-md"
        >
          {publisher && (
            <input type="hidden" name="publisher" value={publisher} />
          )}
          <FiSearch className="ml-3 shrink-0 text-lg text-slate-400" />
          <input
            name="query"
            type="text"
            defaultValue={query}
            placeholder="Search name, phone, department..."
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

      {orders.length > 0 ? (
        <>
          {/* Phones: one card per order, with big Call and WhatsApp buttons */}
          <section className="space-y-4 md:hidden">
            {orders.map((o) => (
              <article
                key={String(o._id)}
                className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                      {o.name}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      <FiMail className="shrink-0" />
                      {o.email}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(o.createdAt)}
                    <br />
                    {formatTime(o.createdAt)}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-zinc-900">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {o.department}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {o.semester} Semester · {o.publisher}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {o.quantity} set{Number(o.quantity) > 1 ? "s" : ""}
                    </span>
                    {priceText(o.totalPrice) ? (
                      <span className="font-extrabold text-[#e7000b] dark:text-red-400">
                        {priceText(o.totalPrice)}
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                        Price not set
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <FiMapPin className="mt-0.5 shrink-0 text-slate-400" />
                  {o.fullAddress}
                </p>

                <div className="mt-4">
                  <ContactButtons phone={o.phone} name={o.name} full />
                  <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
                    {o.phone}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* Tablet and up: the table */}
          <section className="hidden overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:block">
            <Table>
              <Table.ScrollContainer>
                <Table.Content
                  aria-label="Polytechnic orders table"
                  className="min-w-[1100px]"
                >
                  <Table.Header>
                    <Table.Column isRowHeader>Order</Table.Column>
                    <Table.Column>Customer</Table.Column>
                    <Table.Column>Book set</Table.Column>
                    <Table.Column>Qty</Table.Column>
                    <Table.Column>Total</Table.Column>
                    <Table.Column>Address</Table.Column>
                    <Table.Column>Contact</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {orders.map((o) => (
                      <Table.Row key={String(o._id)} id={String(o._id)}>
                        <Table.Cell>
                          <div className="py-1">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {formatDate(o.createdAt)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {formatTime(o.createdAt)}
                            </p>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="min-w-0 max-w-[200px] py-1">
                            <p className="truncate font-semibold text-slate-900 dark:text-white">
                              {o.name}
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {o.email}
                            </p>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="min-w-0 max-w-[240px]">
                            <p
                              className="truncate font-semibold text-slate-900 dark:text-white"
                              title={o.department}
                            >
                              {o.department}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {o.semester} Semester · {o.publisher}
                            </p>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                            {o.quantity} set{Number(o.quantity) > 1 ? "s" : ""}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          {priceText(o.totalPrice) ? (
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {priceText(o.totalPrice)}
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                              Not set
                            </span>
                          )}
                        </Table.Cell>

                        <Table.Cell>
                          <p
                            className="max-w-[240px] truncate text-sm text-slate-600 dark:text-slate-300"
                            title={o.fullAddress}
                          >
                            {o.fullAddress}
                          </p>
                        </Table.Cell>

                        <Table.Cell>
                          <ContactButtons phone={o.phone} name={o.name} />
                        </Table.Cell>
                      </Table.Row>
                    ))}
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
        </>
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
              ? "Polytechnic set orders will appear here."
              : "Try a different search or clear the filters."}
          </p>
          {allOrders.length > 0 && (
            <Link
              href="/dashboard/admin/polytechnic"
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

"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiBookOpen,
  FiUser,
  FiArrowRight,
  FiTruck,
} from "react-icons/fi";

// SAMPLE DATA: replace with real orders from your database
const stats = [
  { label: "Total orders", value: "12", icon: FiShoppingBag, color: "bg-blue-100 text-blue-600" },
  { label: "In progress", value: "2", icon: FiClock, color: "bg-amber-100 text-amber-600" },
  { label: "Delivered", value: "10", icon: FiCheckCircle, color: "bg-green-100 text-green-600" },
  { label: "Total spent", value: "$186", icon: FiDollarSign, color: "bg-red-100 text-red-600" },
];

const orders = [
  { id: "BH-1008", book: "AI Revolution", date: "Oct 8, 2026", total: "$18", status: "Shipped" },
  { id: "BH-1007", book: "The Silent Garden", date: "Oct 2, 2026", total: "$12", status: "Processing" },
  { id: "BH-1006", book: "Quantum Basics", date: "Sep 24, 2026", total: "$22", status: "Delivered" },
  { id: "BH-1005", book: "Rivers of Dhaka", date: "Sep 15, 2026", total: "$15", status: "Delivered" },
];

const statusStyle = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function DashboardPage() {
  const { data } = authClient.useSession();
  const user = data?.user;
  const firstName = user?.name?.split(" ")[0] || "Reader";

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-green-700 to-slate-900 p-6 text-white shadow-xl sm:p-10">
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-red-500/30 blur-3xl" />
        <div className="relative">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Hi {firstName}, welcome back!</h1>
          <p className="mt-2 max-w-xl text-sm text-green-50/90 sm:text-base">
            Track your orders, discover new books and manage your account, all in one place.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/allBooks"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-lg transition hover:bg-green-50"
            >
              <FiBookOpen />
              Browse books
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FiUser />
              Edit profile
            </Link>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${color}`}>
              <Icon />
            </span>
            <p className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">{value}</p>
            <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr] sm:gap-8">
        {/* Recent orders */}
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">Recent orders</h2>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline"
            >
              View all <FiArrowRight />
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Book</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-4 font-semibold text-slate-900">{o.id}</td>
                    <td className="py-4 text-slate-700">{o.book}</td>
                    <td className="py-4 text-slate-500">{o.date}</td>
                    <td className="py-4 font-semibold text-slate-900">{o.total}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-6">
          {/* Order tracking */}
          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <FiTruck className="text-green-600" />
              Latest order
            </h2>
            <p className="mt-1 text-sm text-slate-500">AI Revolution (BH-1008)</p>

            <ol className="mt-5 space-y-4">
              {[
                { t: "Order placed", done: true },
                { t: "Processing", done: true },
                { t: "Shipped", done: true },
                { t: "Delivered", done: false },
              ].map((s) => (
                <li key={s.t} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      s.done ? "bg-green-600 text-white" : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {s.done ? <FiCheckCircle /> : ""}
                  </span>
                  <span className={s.done ? "font-semibold text-slate-900" : "text-slate-400"}>
                    {s.t}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Promo */}
          <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">
            <h2 className="text-lg font-extrabold">Find your next read</h2>
            <p className="mt-2 text-sm text-slate-300">
              New arrivals in Story, Science and Tech are waiting for you.
            </p>
            <Link
              href="/allBooks"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#e7000b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Explore books <FiArrowRight />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"; // npm i recharts
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiBook,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowRight,
  FiPlusCircle,
  FiUserPlus,
  FiPackage,
  FiStar,
} from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  FAKE DATA (demo only): replace with real data from your database   */
/* ------------------------------------------------------------------ */

const revenueData = {
  "7d": [
    { label: "Mon", revenue: 820, orders: 34 },
    { label: "Tue", revenue: 1120, orders: 45 },
    { label: "Wed", revenue: 960, orders: 39 },
    { label: "Thu", revenue: 1480, orders: 58 },
    { label: "Fri", revenue: 1760, orders: 71 },
    { label: "Sat", revenue: 2240, orders: 92 },
    { label: "Sun", revenue: 1910, orders: 77 },
  ],
  "30d": [
    { label: "Sep 12", revenue: 3200, orders: 128 },
    { label: "Sep 15", revenue: 4100, orders: 160 },
    { label: "Sep 18", revenue: 3700, orders: 141 },
    { label: "Sep 21", revenue: 5200, orders: 202 },
    { label: "Sep 24", revenue: 4800, orders: 188 },
    { label: "Sep 27", revenue: 6100, orders: 240 },
    { label: "Sep 30", revenue: 5600, orders: 219 },
    { label: "Oct 03", revenue: 6900, orders: 270 },
    { label: "Oct 06", revenue: 7600, orders: 301 },
    { label: "Oct 09", revenue: 8400, orders: 330 },
  ],
  "12m": [
    { label: "Nov", revenue: 2800, orders: 110 },
    { label: "Dec", revenue: 4200, orders: 168 },
    { label: "Jan", revenue: 3600, orders: 142 },
    { label: "Feb", revenue: 3900, orders: 150 },
    { label: "Mar", revenue: 5100, orders: 203 },
    { label: "Apr", revenue: 4700, orders: 188 },
    { label: "May", revenue: 5900, orders: 232 },
    { label: "Jun", revenue: 6400, orders: 251 },
    { label: "Jul", revenue: 6100, orders: 244 },
    { label: "Aug", revenue: 7300, orders: 289 },
    { label: "Sep", revenue: 8200, orders: 322 },
    { label: "Oct", revenue: 9100, orders: 361 },
  ],
};

const weeklyOrders = [
  { day: "Mon", placed: 34, delivered: 28 },
  { day: "Tue", placed: 45, delivered: 36 },
  { day: "Wed", placed: 39, delivered: 38 },
  { day: "Thu", placed: 58, delivered: 44 },
  { day: "Fri", placed: 71, delivered: 55 },
  { day: "Sat", placed: 92, delivered: 70 },
  { day: "Sun", placed: 77, delivered: 66 },
];

const categoryData = [
  { name: "Story", value: 32, color: "#e7000b" },
  { name: "Tech", value: 28, color: "#2563eb" },
  { name: "Science", value: 22, color: "#16a34a" },
  { name: "History", value: 11, color: "#f59e0b" },
  { name: "Fantasy", value: 7, color: "#8b5cf6" },
];

const topBooks = [
  { title: "AI Revolution", author: "Olivia Johnson", sold: 214 },
  { title: "Quantum Basics", author: "Daniel Reed", sold: 176 },
  { title: "The Silent Garden", author: "Maya Hossain", sold: 149 },
  { title: "Rivers of Dhaka", author: "Rafiq Ahmed", sold: 121 },
  { title: "Code & Coffee", author: "Sara Khan", sold: 98 },
];

const recentOrders = [
  { id: "BH-1042", customer: "Nusrat Jahan", book: "AI Revolution", total: 18, status: "Processing" },
  { id: "BH-1041", customer: "Imran Hossain", book: "Quantum Basics", total: 22, status: "Shipped" },
  { id: "BH-1040", customer: "Tania Akter", book: "The Silent Garden", total: 12, status: "Delivered" },
  { id: "BH-1039", customer: "Sakib Rahman", book: "Rivers of Dhaka", total: 15, status: "Delivered" },
  { id: "BH-1038", customer: "Mim Chowdhury", book: "Code & Coffee", total: 20, status: "Cancelled" },
];

const activity = [
  { text: "New user Nusrat Jahan signed up", time: "2 min ago", icon: FiUserPlus, color: "bg-blue-100 text-blue-600" },
  { text: "Order BH-1042 was placed", time: "9 min ago", icon: FiShoppingBag, color: "bg-green-100 text-green-600" },
  { text: "AI Revolution is running low (3 left)", time: "34 min ago", icon: FiPackage, color: "bg-amber-100 text-amber-600" },
  { text: "New 5-star review on Quantum Basics", time: "1 hour ago", icon: FiStar, color: "bg-red-100 text-red-600" },
];

const statusStyle = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const spark = (arr) => arr.map((v, i) => ({ i, v }));

const stats = [
  {
    label: "Total revenue",
    value: 48250,
    prefix: "$",
    change: 12.4,
    icon: FiDollarSign,
    color: "#16a34a",
    soft: "bg-green-100 text-green-600",
    data: spark([12, 18, 15, 24, 22, 30, 28, 36, 42]),
  },
  {
    label: "Total orders",
    value: 1284,
    change: 8.1,
    icon: FiShoppingBag,
    color: "#2563eb",
    soft: "bg-blue-100 text-blue-600",
    data: spark([20, 24, 22, 30, 28, 34, 40, 38, 46]),
  },
  {
    label: "Customers",
    value: 862,
    change: 5.7,
    icon: FiUsers,
    color: "#8b5cf6",
    soft: "bg-purple-100 text-purple-600",
    data: spark([10, 12, 14, 13, 18, 20, 22, 26, 29]),
  },
  {
    label: "Books in store",
    value: 214,
    change: -2.3,
    icon: FiBook,
    color: "#e7000b",
    soft: "bg-red-100 text-red-600",
    data: spark([30, 28, 31, 29, 27, 28, 26, 25, 24]),
  },
];

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

// Counts a number up from 0 when the page loads
function useCountUp(target, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

// Fades and slides its children in, one after another
function Reveal({ delay = 0, className = "", children }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 30);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ChartTooltip({ active, payload, label, money }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
      <p className="text-xs font-semibold text-slate-400">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-900">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color || p.stroke || p.fill }} />
          {p.name}: {money && p.dataKey === "revenue" ? `$${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
}

function StatCard({ stat, delay }) {
  const count = useCountUp(stat.value);
  const up = stat.change >= 0;
  const Icon = stat.icon;
  const gradId = `spark-${stat.label.replace(/\s/g, "")}`;

  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6">
        <div className="flex items-start justify-between">
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${stat.soft}`}>
            <Icon />
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
              up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {up ? <FiTrendingUp /> : <FiTrendingDown />}
            {Math.abs(stat.change)}%
          </span>
        </div>

        <p className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {stat.prefix}
          {count.toLocaleString()}
        </p>
        <p className="text-xs text-slate-500 sm:text-sm">{stat.label}</p>

        {/* Sparkline */}
        <div className="mt-3 h-12 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stat.data}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stat.color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={stat.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={stat.color}
                strokeWidth={2}
                fill={`url(#${gradId})`}
                animationDuration={1600}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}

const ranges = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "12m", label: "12 months" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AdminOverviewPage() {
  const [range, setRange] = useState("12m");
  const data = revenueData[range];
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = data.reduce((s, d) => s + d.orders, 0);
  const categoryTotal = categoryData.reduce((s, c) => s + c.value, 0);
  const maxSold = Math.max(...topBooks.map((b) => b.sold));

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      {/* Hero header */}
      <Reveal>
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-green-900 to-green-700 p-6 text-white shadow-xl sm:p-10">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-red-500/30 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                Live store overview
              </p>
              <h1 className="mt-4 text-2xl font-extrabold sm:text-4xl">Admin dashboard</h1>
              <p className="mt-2 max-w-xl text-sm text-green-50/90 sm:text-base">
                Sales, orders, customers and stock at a glance. Demo numbers shown below.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/admin/add-book"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-lg transition hover:bg-green-50"
              >
                <FiPlusCircle />
                Add book
              </Link>
              <Link
                href="/dashboard/admin/books"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Manage books
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Stat cards */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {stats.map((s, i) => (
          <StatCard key={s.label} stat={s} delay={100 + i * 100} />
        ))}
      </section>

      {/* Revenue chart + category donut */}
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr] sm:gap-8">
        <Reveal delay={500}>
          <div className="h-full rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Revenue overview</h2>
                <p className="mt-1 text-sm text-slate-500">
                  <span className="text-2xl font-extrabold text-slate-900">
                    ${totalRevenue.toLocaleString()}
                  </span>{" "}
                  from {totalOrders.toLocaleString()} orders
                </p>
              </div>

              {/* Range tabs */}
              <div className="flex w-fit rounded-xl bg-slate-100 p-1">
                {ranges.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setRange(r.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                      range === r.key
                        ? "bg-white text-green-700 shadow"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 h-72 w-full sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                {/* key makes the chart animate again when the range changes */}
                <AreaChart key={range} data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v >= 1000 ? v / 1000 + "k" : v}`}
                  />
                  <Tooltip content={<ChartTooltip money />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#16a34a"
                    strokeWidth={3}
                    fill="url(#revGrad)"
                    activeDot={{ r: 6, strokeWidth: 3, stroke: "#fff" }}
                    animationDuration={1400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="h-full rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900">Sales by category</h2>
            <p className="mt-1 text-sm text-slate-500">Share of total book sales</p>

            <div className="relative mx-auto mt-4 h-56 w-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={68}
                    outerRadius={100}
                    paddingAngle={4}
                    cornerRadius={6}
                    stroke="none"
                    animationDuration={1400}
                  >
                    {categoryData.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-extrabold text-slate-900">{categoryTotal}%</p>
                <p className="text-xs text-slate-500">All categories</p>
              </div>
            </div>

            <ul className="mt-4 space-y-2.5">
              {categoryData.map((c) => (
                <li key={c.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-bold text-slate-900">{c.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Weekly orders + top books */}
      <section className="grid gap-6 lg:grid-cols-2 sm:gap-8">
        <Reveal delay={700}>
          <div className="h-full rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">Orders this week</h2>
                <p className="mt-1 text-sm text-slate-500">Placed vs delivered</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e7000b]" /> Placed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#16a34a]" /> Delivered
                </span>
              </div>
            </div>

            <div className="mt-6 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyOrders} margin={{ top: 10, right: 5, left: -25, bottom: 0 }} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f1f5f9" }} />
                  <Bar dataKey="placed" name="Placed" fill="#e7000b" radius={[8, 8, 0, 0]} animationDuration={1300} />
                  <Bar dataKey="delivered" name="Delivered" fill="#16a34a" radius={[8, 8, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={800}>
          <div className="h-full rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900">Top selling books</h2>
            <p className="mt-1 text-sm text-slate-500">Copies sold this year</p>

            <ul className="mt-6 space-y-5">
              {topBooks.map((b, i) => (
                <li key={b.title}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-600">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-900">{b.title}</p>
                        <p className="truncate text-xs text-slate-500">{b.author}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-extrabold text-slate-900">{b.sold}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-[#e7000b] transition-all duration-1000 ease-out"
                      style={{ width: `${(b.sold / maxSold) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Recent orders + activity */}
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr] sm:gap-8">
        <Reveal delay={900}>
          <div className="h-full rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">Recent orders</h2>
              <Link
                href="/dashboard/admin/orders"
                className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline"
              >
                View all <FiArrowRight />
              </Link>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-3 font-semibold">Order</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Book</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-slate-50 transition last:border-0 hover:bg-slate-50">
                      <td className="py-4 font-semibold text-slate-900">{o.id}</td>
                      <td className="py-4 text-slate-700">{o.customer}</td>
                      <td className="py-4 text-slate-500">{o.book}</td>
                      <td className="py-4 font-semibold text-slate-900">${o.total}</td>
                      <td className="py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyle[o.status]}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={1000}>
          <div className="h-full rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-lg font-extrabold text-slate-900">Recent activity</h2>
            <ul className="relative mt-6 space-y-5">
              <span className="absolute bottom-2 left-5 top-2 w-px bg-slate-100" />
              {activity.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.text} className="relative flex items-start gap-4">
                    <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ring-4 ring-white ${a.color}`}>
                      <Icon />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-semibold text-slate-900">{a.text}</p>
                      <p className="text-xs text-slate-400">{a.time}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
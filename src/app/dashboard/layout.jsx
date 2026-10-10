"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FiGrid,
  FiShoppingBag,
  FiUser,
  FiBookOpen,
  FiUsers,
  FiPlusCircle,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
} from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";

// Sidebar links for each role (create these pages as you build them)
const userNav = [
  { label: "Overview", href: "/dashboard", icon: FiGrid, exact: true },
  { label: "My orders", href: "/dashboard/orders", icon: FiShoppingBag },
  { label: "My profile", href: "/profile", icon: FiUser },
  { label: "Browse books", href: "/allBooks", icon: FiBookOpen },
];

const adminNav = [
  { label: "Overview", href: "/dashboard/admin", icon: FiGrid, exact: true },
  { label: "Manage books", href: "/dashboard/admin/books", icon: FiBookOpen },
  { label: "Add book", href: "/dashboard/admin/add-book", icon: FiPlusCircle },
  { label: "Orders", href: "/dashboard/admin/orders", icon: FiShoppingBag },
  { label: "Users", href: "/dashboard/admin/users", icon: FiUsers },
  { label: "My profile", href: "/profile", icon: FiUser },
];

function Avatar({ user, size = "h-10 w-10" }) {
  const [failed, setFailed] = useState(false);
  const letter = (user?.name || "U")[0].toUpperCase();
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-600 font-bold text-white`}
    >
      {user?.image && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.image}
          alt={user.name || "User"}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        letter
      )}
    </span>
  );
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const isAdmin = user?.role === "admin";
  const nav = isAdmin ? adminNav : userNav;

  // Not logged in -> login page
  useEffect(() => {
    if (!isPending && !user) router.replace("/login");
  }, [isPending, user, router]);

  // Normal user opened an admin page -> send to their dashboard
  useEffect(() => {
    if (!isPending && user && !isAdmin && pathname.startsWith("/dashboard/admin")) {
      router.replace("/dashboard");
    }
  }, [isPending, user, isAdmin, pathname, router]);

  const isActive = (item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  // Sidebar content is shared by desktop and mobile
  const sidebar = (
    <div className="flex h-full flex-col bg-slate-900 text-slate-300">
      <div className="flex h-16 shrink-0 items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white">
            <FaBookOpen />
          </span>
          <span className="text-xl font-extrabold text-white">
            Book<span className="ml-0.5 rounded-md bg-red-600 px-1.5">Hunt</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="rounded-lg p-2 text-xl text-slate-400 hover:bg-white/10 lg:hidden"
        >
          <FiX />
        </button>
      </div>

      <p className="px-6 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {isAdmin ? "Admin panel" : "My account"}
      </p>

      <nav aria-label="Dashboard" className="flex-1 space-y-1 overflow-y-auto px-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-green-600 text-white shadow-lg shadow-green-900/30"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="text-lg" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-white/10 p-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10 hover:text-white"
        >
          <FiHome className="text-lg" />
          Back to website
        </Link>

        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <Avatar user={user} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{isAdmin ? "Admin" : "Reader"}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          <FiLogOut />
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>

      {/* Mobile slide-over */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85%] transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebar}
        </aside>
      </div>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl text-slate-700 transition hover:bg-slate-200 lg:hidden"
            >
              <FiMenu />
            </button>
            <div>
              <p className="text-xs text-slate-500">Welcome back</p>
              <p className="text-sm font-bold text-slate-900 sm:text-base">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:inline-block ${
                isAdmin ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}
            >
              {isAdmin ? "Admin" : "Reader"}
            </span>
            <Avatar user={user} />
          </div>
        </header>

        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
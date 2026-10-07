"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import { FiLogOut, FiGrid } from "react-icons/fi";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/allBooks" },
  { label: "Profile", href: "/profile" },
  { label: "Contact", href: "/contact" },
];

function Logo({ onClick }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-red-600 shadow-md">
        <FaBookOpen />
      </span>
      <span className="text-2xl font-extrabold tracking-tight text-white">
        Book
        <span className="ml-0.5 rounded-md bg-white px-1.5 text-red-600">Hunt</span>
      </span>
    </Link>
  );
}

// Shows the user's photo, or the first letter of the name if there is no photo
function UserAvatar({ user, size = "h-10 w-10" }) {
  const [failed, setFailed] = useState(false);
  const letter = (user?.name || user?.email || "U")[0].toUpperCase();

  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-base font-bold text-green-700 ring-2 ring-white/60`}
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

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Admin goes to /dashboard/admin, everyone else to /dashboard
  const dashboardHref = user?.role === "admin" ? "/dashboard/admin" : "/dashboard";

  // Dashboard link shows in the nav only after login
  const links = user
    ? [...baseLinks, { label: "Dashboard", href: dashboardHref }]
    : baseLinks;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/dashboard")) return pathname.startsWith("/dashboard");
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut();
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-green-600/95 shadow-lg shadow-green-900/10 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="container mx-auto flex items-center justify-between px-5 py-3 sm:px-8"
      >
        <Logo onClick={() => setOpen(false)} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive(href)
                    ? "bg-white text-green-700 shadow"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }`}
              >
                {label === "Dashboard" && <FiGrid />}
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            // Placeholder while the session loads (no flash of Sign in buttons)
            <div className="h-10 w-40 animate-pulse rounded-xl bg-white/20" />
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div className="hidden leading-tight lg:block">
                  <p className="max-w-[140px] truncate text-sm font-bold text-white">
                    {user.name}
                  </p>
                  {user.role === "admin" && (
                    <p className="text-xs font-semibold text-green-100">Admin</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loggingOut}
                className="flex items-center gap-2 rounded-xl border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
              >
                <FiLogOut />
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-white/70 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Sign in
              </Link>
              <Link
                href="/signin"
                className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-red-900/20 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-2xl text-white transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
        >
          {open ? <IoClose /> : <IoMenuSharp />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t border-white/15 transition-all duration-300 md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-transparent opacity-0"
        }`}
      >
        <div className="min-h-0">
          {/* User card (only when logged in) */}
          {user && (
            <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl bg-white/15 p-3 sm:mx-8">
              <UserAvatar user={user} size="h-12 w-12" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{user.name}</p>
                <p className="truncate text-xs text-green-100">
                  {user.role === "admin" ? "Admin" : user.email}
                </p>
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-1 px-5 pb-3 pt-3 sm:px-8">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive(href)
                      ? "bg-white text-green-700"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {label === "Dashboard" && <FiGrid />}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-5 pb-5 sm:px-8">
            {isPending ? (
              <div className="h-12 animate-pulse rounded-xl bg-white/20" />
            ) : user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loggingOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:opacity-60"
              >
                <FiLogOut />
                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/70 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-green-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
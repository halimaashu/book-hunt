"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";

const links = [
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

const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive(href)
                    ? "bg-white text-green-700 shadow"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
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
          <ul className="flex flex-col gap-1 px-5 pb-3 pt-3 sm:px-8">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive(href)
                      ? "bg-white text-green-700"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:px-8">
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
        </div>
      </div>
    </header>
  );
};

export default NavBar;
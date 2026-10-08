"use client";

import { useState } from "react";
import {
  Check,
  UserPlus,
  Search,
  ShoppingBag,
  CreditCard,
  PackageCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"; // npm i lucide-react

const steps = [
  {
    step: 1,
    title: "Create account",
    short: "Sign up",
    icon: UserPlus,
    description:
      "Sign up with your email or continue with Google. Confirm the verification link we send you and your dashboard, orders and reviews are ready to use.",
    points: ["Email or Google sign-up", "Email verification", "Personal dashboard"],
  },
  {
    step: 2,
    title: "Find your book",
    short: "Browse",
    icon: Search,
    description:
      "Search by title, author or category, and filter by price, rating or language. Every card shows the cover, price and stock so you can compare quickly.",
    points: ["Search & filters", "Category browsing", "Live stock status"],
  },
  {
    step: 3,
    title: "View details & book",
    short: "Book",
    icon: ShoppingBag,
    description:
      "Click View Details to read the full description, edition, page count, delivery estimate and reader reviews. Happy with it? Choose a quantity, add a coupon and press Book Now.",
    points: ["Full book info", "Reader reviews", "Coupon codes"],
  },
  {
    step: 4,
    title: "Pay with Stripe",
    short: "Pay",
    icon: CreditCard,
    description:
      "Enter your delivery address and pay securely through Stripe. Card details are encrypted and handled by Stripe, so we never store them. You get an instant receipt by email.",
    points: ["Stripe secure checkout", "PCI-compliant encryption", "Instant email receipt"],
  },
  {
    step: 5,
    title: "Track & receive",
    short: "Receive",
    icon: PackageCheck,
    description:
      "Follow your order from Processing to Shipped to Delivered, with an email at every stage. When the book arrives, leave a review to help other readers.",
    points: ["Live order tracking", "Status notifications", "Leave a review"],
  },
];

const SimpleStep = () => {
  const [current, setCurrent] = useState(1);
  const active = steps[current - 1];
  const ActiveIcon = active.icon;
  const progress = ((current - 1) / (steps.length - 1)) * 100;

  return (
    <section className="w-full bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-zinc-950 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" />
            Order in under 3 minutes
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-6xl">
            From sign-up to your doorstep in 5 steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:text-lg">
            No complicated forms and no hidden fees. Pick a book, pay securely with
            Stripe, and track it until it arrives.
          </p>
        </header>

        {/* Stepper rail */}
        <nav aria-label="Ordering steps" className="relative mt-10 sm:mt-14">
          {/* track */}
          <div className="absolute left-[10%] right-[10%] top-5 h-1 rounded-full bg-slate-200 dark:bg-slate-700 sm:top-6" />
          {/* fill */}
          <div
            className="absolute left-[10%] top-5 h-1 rounded-full bg-emerald-500 transition-all duration-500 sm:top-6"
            style={{ width: `${progress * 0.8}%` }}
          />

          <ol className="relative grid grid-cols-5">
            {steps.map(({ step, short, icon: Icon }) => {
              const isActive = current === step;
              const isDone = current > step;
              return (
                <li key={step} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setCurrent(step)}
                    aria-current={isActive ? "step" : undefined}
                    className="group flex flex-col items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-12 sm:w-12 ${
                        isDone
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : isActive
                          ? "scale-110 border-red-600 bg-red-600 text-white shadow-lg shadow-red-300/60 dark:shadow-red-900/50"
                          : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-400 dark:border-slate-700 dark:bg-zinc-900 dark:text-slate-500 dark:group-hover:border-slate-500"
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                      ) : (
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </span>
                    <span
                      className={`text-[11px] font-semibold transition-colors sm:text-sm ${
                        isActive
                          ? "text-red-600 dark:text-red-400"
                          : isDone
                          ? "text-slate-800 dark:text-slate-200"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {short}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Detail panel */}
        <div
          key={current}
          className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition-colors duration-300 dark:border-slate-800 dark:bg-zinc-900 dark:shadow-black/40 sm:mt-10"
        >
          <div className="grid md:grid-cols-[220px_1fr]">
            {/* Left: big step marker */}
            <div className="flex items-center gap-4 bg-slate-900 p-6 text-white dark:bg-slate-800 md:flex-col md:items-start md:justify-between md:p-8">
              <ActiveIcon className="h-10 w-10 text-red-400 md:h-12 md:w-12" />
              <div>
                <p className="text-xs text-slate-400">
                  Step {current} of {steps.length}
                </p>
                <p className="text-5xl font-extrabold leading-none md:mt-2 md:text-7xl">
                  {String(current).padStart(2, "0")}
                </p>
              </div>
            </div>

            {/* Right: content */}
            <div className="p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-3xl">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                {active.description}
              </p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {active.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 dark:bg-zinc-800 dark:text-slate-300 sm:text-sm"
                  >
                    <Check
                      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      strokeWidth={3}
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setCurrent((p) => Math.max(p - 1, 1))}
                  disabled={current === 1}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-zinc-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                {current === steps.length ? (
                  <a
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-300/50 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-900"
                  >
                    Start ordering
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrent((p) => Math.min(p + 1, steps.length))}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:shadow-black/30 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-zinc-900"
                  >
                    Next step
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleStep;
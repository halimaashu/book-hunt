import Link from "next/link";
import React from "react";
import CopyTransactionId from "@/components/shared/CopyTransactionId";
import {
  FiCheck,
  FiPackage,
  FiTruck,
  FiClipboard,
  FiArrowRight,
  FiShoppingBag,
  FiMail,
} from "react-icons/fi";

export const metadata = {
  title: "Payment successful | BooksHunt",
};

const steps = [
  { icon: FiClipboard, title: "Order confirmed", text: "We received your payment." },
  { icon: FiPackage, title: "Packing", text: "Your books are being packed." },
  { icon: FiTruck, title: "On the way", text: "Delivered to your address." },
];

const page = async ({ params }) => {
  const { tran_id } = await params; // the folder is named [tran_id]

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-zinc-900">
      {/* Soft background glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-300/30 blur-3xl dark:bg-green-500/10" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-red-300/30 blur-3xl dark:bg-red-500/10" />

      <div className="relative w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-xl shadow-slate-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40 sm:p-10">
        {/* Animated check */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/40 dark:bg-green-500/30" />
          <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-5xl text-white shadow-lg shadow-green-300 dark:shadow-green-900/50">
            <FiCheck strokeWidth={3} />
          </span>
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Payment successful!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Thank you for your order. We have received your payment and we are getting your
          books ready.
        </p>

        {/* Transaction id */}
        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Transaction ID</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="min-w-0 break-all font-mono text-sm font-bold text-slate-900 dark:text-white">
              {tran_id}
            </p>
            <CopyTransactionId value={tran_id} />
          </div>
        </div>

        {/* What happens next */}
        <ol className="mt-8 grid gap-4 text-left sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="rounded-2xl border border-slate-100 p-4 dark:border-zinc-800"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
                  i === 0
                    ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                    : "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-slate-400"
                }`}
              >
                <Icon />
              </span>
              <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">{title}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <FiMail />
          Keep your transaction ID in case you need to contact us.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950"
          >
            <FiShoppingBag />
            View my orders
          </Link>
          <Link
            href="/allBooks"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-200 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
          >
            Continue shopping
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
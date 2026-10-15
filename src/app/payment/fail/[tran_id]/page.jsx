import Link from "next/link";
import React from "react";
import CopyTransactionId from "@/components/shared/CopyTransactionId";
import {
  FiX,
  FiRefreshCw,
  FiHeadphones,
  FiHome,
  FiAlertCircle,
  FiCreditCard,
  FiWifiOff,
  FiSlash,
} from "react-icons/fi";

export const metadata = {
  title: "Payment failed | BooksHunt",
};

const reasons = [
  { icon: FiCreditCard, text: "Not enough balance, or the card or wallet was declined" },
  { icon: FiSlash, text: "The payment was cancelled before it finished" },
  { icon: FiWifiOff, text: "The connection dropped during payment" },
];

const page = async ({ params }) => {
  const { tran_id } = await params; // the folder is named [tran_id]

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-zinc-900">
      {/* Soft background glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-red-300/30 blur-3xl dark:bg-red-500/10" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-500/10" />

      <div className="relative w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-xl shadow-slate-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40 sm:p-10">
        {/* Animated cross */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400/40 dark:bg-red-500/30" />
          <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#e7000b] text-5xl text-white shadow-lg shadow-red-300 dark:shadow-red-900/50">
            <FiX strokeWidth={3} />
          </span>
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Payment failed
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Your payment was not completed, so your order was not placed. You can try again
          whenever you are ready.
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

        {/* Common reasons */}
        <div className="mt-8 rounded-2xl border border-slate-100 p-5 text-left dark:border-zinc-800">
          <p className="text-sm font-bold text-slate-900 dark:text-white">Common reasons</p>
          <ul className="mt-4 space-y-3">
            {reasons.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-base text-red-600 dark:bg-red-500/20 dark:text-red-400">
                  <Icon />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Help note */}
        <p className="mt-6 flex items-start justify-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-left text-xs leading-relaxed text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 sm:text-sm">
          <FiAlertCircle className="mt-0.5 shrink-0 text-base" />
          If money was taken from your account, please contact us and share the transaction ID above.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/allBooks"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950"
          >
            <FiRefreshCw />
            Try again
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-200 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
          >
            <FiHeadphones />
            Contact support
          </Link>
        </div>

        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-green-700 dark:text-slate-400 dark:hover:text-green-400"
        >
          <FiHome />
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default page;
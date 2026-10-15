import Link from "next/link";
import React from "react";
import CopyTransactionId from "@/components/shared/CopyTransactionId";
import {
  FiX,
  FiRefreshCw,
  FiHeadphones,
  FiHome,
  FiAlertCircle,
  FiHelpCircle,
  FiShoppingBag,
  FiBookOpen,
} from "react-icons/fi";

export const metadata = {
  title: "Payment failed | BooksHunt",
};

// Steps for a real failed payment
const failedSteps = [
  {
    title: "Check your balance",
    text: "Make sure your card or mobile wallet has enough money and is not blocked.",
  },
  {
    title: "Check My orders",
    text: "Open your orders page to see if any order was created. Only paid orders are placed.",
  },
  {
    title: "Try again",
    text: "Go back to the book and place a new order. A failed payment cannot be resumed.",
  },
  {
    title: "Still stuck? Contact us",
    text: "If money left your account, send us the transaction ID shown above.",
  },
];

// Steps when someone opens the page without a (valid) transaction ID
const missingSteps = [
  {
    title: "Check My orders",
    text: "Your recent orders and their status are listed on your dashboard.",
  },
  {
    title: "Check your email and phone",
    text: "Your bank or wallet may have sent a message about the payment.",
  },
  {
    title: "Contact us with the details",
    text: "Tell us what you were buying and when, and we will look into it.",
  },
];

// Works for /payment/fail and /payment/fail/<id>
// Folder name: app/payment/fail/[[...tran_id]]/page.jsx
const page = async ({ params }) => {
  const { tran_id } = await params;
  const rawId = Array.isArray(tran_id) ? tran_id[0] : tran_id;

  // Transaction ids from your backend are 24 character hex strings (Mongo ObjectId)
  const hasId = Boolean(rawId);
  const validId = hasId && /^[a-f0-9]{24}$/i.test(rawId);

  const mode = validId ? "failed" : hasId ? "invalid" : "missing";
  const steps = mode === "failed" ? failedSteps : missingSteps;

  const content = {
    failed: {
      title: "Payment failed",
      text: "Your payment was not completed, so your order was not placed. You can try again whenever you are ready.",
    },
    invalid: {
      title: "Invalid transaction ID",
      text: "The transaction ID in this link does not look right, so we cannot show a payment for it.",
    },
    missing: {
      title: "No payment found",
      text: "You opened this page directly, so there is no payment to show. Payment results appear here after you try to pay for an order.",
    },
  }[mode];

  const isFailed = mode === "failed";

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 transition-colors duration-300 dark:bg-zinc-900">
      {/* Soft background glows */}
      <div
        className={`pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl ${
          isFailed ? "bg-red-300/30 dark:bg-red-500/10" : "bg-amber-300/30 dark:bg-amber-500/10"
        }`}
      />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl dark:bg-zinc-500/10" />

      <div className="relative w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-xl shadow-slate-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40 sm:p-10">
        {/* Animated icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
              isFailed ? "bg-red-400/40 dark:bg-red-500/30" : "bg-amber-400/40 dark:bg-amber-500/30"
            }`}
          />
          <span
            className={`relative flex h-24 w-24 items-center justify-center rounded-full text-5xl text-white shadow-lg ${
              isFailed
                ? "bg-[#e7000b] shadow-red-300 dark:shadow-red-900/50"
                : "bg-amber-500 shadow-amber-300 dark:shadow-amber-900/50"
            }`}
          >
            {isFailed ? <FiX strokeWidth={3} /> : <FiHelpCircle />}
          </span>
        </div>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          {content.text}
        </p>

        {/* Transaction id (only for a real failed payment) */}
        {isFailed && (
          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Transaction ID</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="min-w-0 break-all font-mono text-sm font-bold text-slate-900 dark:text-white">
                {rawId}
              </p>
              <CopyTransactionId value={rawId} />
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="mt-8 rounded-2xl border border-slate-100 p-5 text-left dark:border-zinc-800">
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {isFailed ? "What to do next" : "Looking for a payment?"}
          </p>
          <ol className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex items-start gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                    isFailed
                      ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Help note */}
        {isFailed && (
          <p className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-left text-xs leading-relaxed text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 sm:text-sm">
            <FiAlertCircle className="mt-0.5 shrink-0 text-base" />
            If money was taken from your account, please contact us and share the transaction ID above.
          </p>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {isFailed ? (
            <Link
              href="/allBooks"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950"
            >
              <FiRefreshCw />
              Try again
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard/orders"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950"
              >
                <FiShoppingBag />
                My orders
              </Link>
              <Link
                href="/allBooks"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-slate-200 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
              >
                <FiBookOpen />
                Browse books
              </Link>
            </>
          )}

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
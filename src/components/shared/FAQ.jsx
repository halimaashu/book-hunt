"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiMail } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

// Edit these answers to match your real policies
const faqs = [
  {
    q: "Are the books on BooksHunt original?",
    a: "Yes. We only sell genuine books sourced from publishers and authorized distributors. We do not sell copies or counterfeit prints.",
  },
  {
    q: "How do I place an order?",
    a: "Create an account, find your book, open View Details, then click Book Now. Enter your delivery address and pay securely with Stripe. The whole process takes only a few minutes.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. Payments are handled by Stripe, and your card details are encrypted. We never see or store your card information on our servers.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery inside Dhaka usually takes 2-3 working days, and other areas take 3-5 working days. You can follow your order status from your dashboard, and we email you at every stage.",
  },
  {
    q: "Can I return or exchange a book?",
    a: "Yes. If your book arrives damaged or you received the wrong one, contact us within 7 days of delivery and we will arrange a replacement or refund.",
  },
  {
    q: "What if a book is out of stock?",
    a: "Each book card shows how many copies are available. If a title is out of stock, check back soon because we update our library every week.",
  },
  {
    q: "Do I need an account to buy a book?",
    a: "Yes. An account lets you track orders, save your details, and leave reviews. You can sign up with your email in under a minute.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-slate-50 px-4 py-14 transition-colors duration-300 dark:bg-zinc-950 sm:px-6 sm:py-20 lg:py-24">
      <div className="container mx-auto grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        {/* Left: heading */}
        <div className="text-center lg:sticky lg:top-24 lg:self-start lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300 sm:text-sm">
            <FaQuestionCircle />
            FAQ
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Questions? We have answers
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:mx-0">
            Everything you need to know about ordering, payment and delivery. Cannot
            find your answer? Send us a message.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:shadow-black/30 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-zinc-950"
          >
            <FiMail />
            Contact support
          </Link>
        </div>

        {/* Right: accordion */}
        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border bg-white transition-all duration-300 dark:bg-zinc-900 ${
                  isOpen
                    ? "border-green-300 shadow-lg shadow-green-100 dark:border-green-500/50 dark:shadow-green-900/20"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-600"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 sm:px-6 sm:py-5"
                  >
                    <span
                      className={`text-sm font-semibold sm:text-base ${
                        isOpen
                          ? "text-green-700 dark:text-green-400"
                          : "text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "bg-green-600 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-slate-300"
                      }`}
                    >
                      {isOpen ? <FiMinus /> : <FiPlus />}
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:px-6 sm:text-base">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
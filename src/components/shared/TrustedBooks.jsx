"use client";

import { BadgeCheck, ShieldCheck, RotateCcw, Truck, BookOpenCheck } from "lucide-react"; // npm i lucide-react

const features = [
  {
    icon: BadgeCheck,
    title: "100% original books",
    text: "Every book comes straight from publishers and authorized distributors. No copies, no counterfeit prints.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Stripe payment",
    text: "Your card details are encrypted and handled by Stripe. We never see or store them.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    text: "Received a damaged or wrong book? Request a return from your dashboard and we will sort it out.",
  },
  {
    icon: Truck,
    title: "Tracked delivery",
    text: "Follow your order from Processing to Delivered, with an email update at every stage.",
  },
];

// Replace with your real numbers
const stats = [
  { value: "5,000+", label: "Original titles" },
  { value: "10,000+", label: "Happy readers" },
  { value: "4.8/5", label: "Average rating" },
];

const TrustedBooks = () => {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Top: heading + stats */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 sm:text-sm">
              <BookOpenCheck className="h-4 w-4" />
              Authentic. Verified. Trusted.
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Original books you can trust, every single time
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg">
              We only sell genuine, quality-checked books. If it is not original, it
              is not on our shelf.
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-3xl bg-slate-900 py-6 text-center text-white sm:py-8">
            {stats.map((s) => (
              <div key={s.label} className="px-2 sm:px-4">
                <p className="text-xl font-extrabold sm:text-3xl lg:text-4xl">{s.value}</p>
                <p className="mt-1 text-[11px] text-slate-400 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust features */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-red-200 hover:bg-white hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-300/50">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBooks;
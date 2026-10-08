"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBookOpen, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";

// Replace with your real details
const CONTACT_EMAIL = "halima520ashu@gmail.com";
const WHATSAPP_NUMBER = "8801975665249"; // country code + number, no + or spaces

const info = [
  {
    icon: FiMapPin,
    title: "Visit us",
    text: "Satrasta, Dhaka",
    color: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
  },
  {
    icon: FiMail,
    title: "Email us",
    text: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    text: WHATSAPP_NUMBER,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    color: "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-300",
  },
  {
    icon: FiClock,
    title: "Working hours",
    text: "Sat - Thu, 10:00 AM - 8:00 PM",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-slate-700 dark:bg-zinc-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-green-400 dark:focus:ring-green-500/30";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  // Opens the user's email app with the message filled in.
  // To send from your server instead, replace this with a fetch() to an API route.
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = f.get("name");
    const email = f.get("email");
    const subject = f.get("subject");
    const message = f.get("message");

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    form.reset();
  };

  return (
    <main className="bg-slate-50 transition-colors duration-300 dark:bg-zinc-950">
      {/* Header */}
      <section className="border-b border-slate-100 bg-gradient-to-br from-green-50 via-white to-red-50 dark:border-slate-800 dark:from-green-950/40 dark:via-zinc-950 dark:to-red-950/30">
        <div className="container mx-auto px-5 py-12 text-center sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-green-700 shadow-sm dark:bg-zinc-900 dark:text-green-300 dark:ring-1 dark:ring-slate-800 sm:text-sm">
            <FaBookOpen />
            Contact us
          </p>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-6xl">
            Let&apos;s talk about books
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:text-lg">
            Questions about an order, a book, or delivery? Send us a message and we
            will get back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-5 py-10 sm:py-14">
        {/* Info cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(({ icon: Icon, title, text, href, color }) => {
            const content = (
              <>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${color}`}
                >
                  <Icon />
                </span>
                <h2 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {title}
                </h2>
                <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-400">
                  {text}
                </p>
              </>
            );
            const cardClass =
              "block rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-zinc-900 dark:hover:shadow-black/40";

            return href ? (
              <a key={title} href={href} className={cardClass}>
                {content}
              </a>
            ) : (
              <div key={title} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Form + side panel */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr]">
          {/* Form */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-zinc-900 dark:shadow-black/40 sm:p-10">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Send us a message
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Fill in the form and your email app will open with the message ready to send.
            </p>

            {sent && (
              <div
                role="status"
                className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300"
              >
                <FiCheckCircle className="mt-0.5 shrink-0 text-lg" />
                Your email app should be open now. Press send to deliver your message.
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={3}
                    placeholder="John Doe"
                    autoComplete="name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  placeholder="Write your message here..."
                  className={`${inputClass} resize-y`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-900 sm:w-fit"
              >
                <FiSend />
                Send message
              </button>
            </form>
          </div>

          {/* Side panel */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl bg-gradient-to-br from-green-600 to-slate-900 p-8 text-white shadow-xl dark:from-green-700 dark:to-zinc-900 dark:ring-1 dark:ring-slate-800">
              <h2 className="text-2xl font-extrabold">Need a quick answer?</h2>
              <p className="mt-3 text-sm leading-relaxed text-green-50/90">
                Most questions about ordering, payment and delivery are already
                answered in our FAQ.
              </p>
              <Link
                href="/#faq"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                Read the FAQ
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-zinc-900">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Prefer chatting?
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Message us on WhatsApp for the fastest reply during working hours.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:bg-green-700 dark:shadow-green-900/40"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
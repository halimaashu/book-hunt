"use client";

import heroBg from "@/assets/hero-bg.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaBookOpen, FaStar, FaShieldAlt } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const stats = [
  { value: "5,000+", label: "Books" },
  { value: "10k+", label: "Readers" },
  { value: "4.8", label: "Rating" },
];

export default function Banner() {
  // Main image floats up and down
  const float = useSpring({
    from: { transform: "translateY(0px)" },
    to: { transform: "translateY(-16px)" },
    config: { duration: 2500 },
    loop: { reverse: true },
  });

  // Small badge floats the opposite way
  const floatAlt = useSpring({
    from: { transform: "translateY(-10px)" },
    to: { transform: "translateY(10px)" },
    config: { duration: 3000 },
    loop: { reverse: true },
  });

  return (
    // RULE: light-gradient -> dark gradient
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-red-50 transition-colors duration-300 dark:from-slate-950 dark:via-zinc-950 dark:to-red-950/30">
      {/* Soft background glows: pastel -> low-opacity bright color */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-200/40 blur-3xl dark:bg-red-500/10" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-green-200/40 blur-3xl dark:bg-green-500/10" />

      <div className="container relative mx-auto flex flex-col items-center gap-12 px-5 py-14 sm:py-20 lg:flex-row lg:gap-16 lg:py-28">
        {/* Left: content */}
        <div className="flex-1 text-center lg:text-left">
          {/* RULE: white surface -> zinc-900, colored text 600 -> 400 */}
          <p className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-1.5 text-xs font-semibold text-red-600 shadow-sm dark:border-red-500/30 dark:bg-zinc-900 dark:text-red-400 sm:text-sm">
            <FaBookOpen />
            Your online bookstore
          </p>

          {/* RULE: dark text -> white */}
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Find your next read at{" "}
            {/* Gradient text is bright enough for both modes: no change needed */}
            <span className="bg-gradient-to-r from-[#e7000b] to-green-500 bg-clip-text text-transparent">
              BooksHunt
            </span>
          </h1>

          {/* RULE: gray text 600 -> 400 */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg lg:mx-0">
            Discover thousands of original books across every genre, pay securely,
            and start your next reading journey today.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            {/* Strong colored button: keeps its color, only the glow and ring offset change */}
            <Link
              href="/allBooks"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-300/60 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/50 dark:focus-visible:ring-offset-zinc-950 sm:w-auto"
            >
              Browse books
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Outline button: border, background, text and hover all need a dark partner */}
            <Link
              href="/#how-it-works"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-zinc-900 dark:text-slate-200 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950 sm:w-auto"
            >
              How it works
            </Link>
          </div>

          {/* Stats: divide-* is a color too */}
          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-slate-200 dark:divide-slate-700 lg:mx-0">
            {stats.map((s) => (
              <div key={s.label} className="px-3 first:pl-0 sm:px-5">
                <p className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="relative w-full max-w-sm flex-1 sm:max-w-md lg:max-w-lg">
          {/* Decorative frame: already translucent, works in both modes */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-3xl bg-gradient-to-br from-[#e7000b] to-green-500 opacity-20" />

          <animated.div style={float} className="relative">
            <Image
              src={heroBg}
              width={500}
              height={500}
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 448px, 512px"
              alt="Stack of books on display"
              className="mx-auto h-auto w-full rounded-3xl object-cover shadow-2xl dark:shadow-black/60"
            />
          </animated.div>

          {/* Floating badge: rating */}
          <animated.div
            style={floatAlt}
            className="absolute -left-2 top-8 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-slate-800 sm:-left-6 sm:px-4 sm:py-3"
          >
            {/* RULE: pastel bg (100) -> translucent bg, text 500 -> 400 */}
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-400 sm:h-10 sm:w-10">
              <FaStar />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">4.8 / 5</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Reader reviews</p>
            </div>
          </animated.div>

          {/* Floating badge: original books */}
          <animated.div
            style={floatAlt}
            className="absolute -right-2 bottom-8 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-slate-800 sm:-right-6 sm:px-4 sm:py-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 sm:h-10 sm:w-10">
              <FaShieldAlt />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">100% Original</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Verified books</p>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
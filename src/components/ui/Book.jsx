import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineExplore } from "react-icons/md";
import { FaArrowRight, FaUserEdit } from "react-icons/fa";

export default function Book({ book }) {
  const qty = Number(book?.available_quantity ?? 0);
  const stock =
    qty === 0
      ? {
          text: "Out of stock",
          style: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
        }
      : qty <= 5
      ? {
          text: `Only ${qty} left`,
          style: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
        }
      : {
          text: `${qty} in stock`,
          style: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
        };

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-zinc-900 dark:hover:shadow-black/40">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <Image
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          src={book?.image_url}
          fill
          alt={book?.title || "Book cover"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur dark:bg-zinc-900/90 dark:text-blue-300">
          {book?.category}
        </span>

        {/* Stock badge */}
        <span
          className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${stock.style}`}
        >
          {stock.text}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
          {book?.title}
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <FaUserEdit className="text-slate-400 dark:text-slate-500" />
          {book?.author}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {book?.description}
        </p>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button
            isDisabled={qty === 0}
            className="rounded-xl bg-[#e7000b] text-sm font-semibold text-white shadow-md shadow-red-200 hover:bg-red-700 dark:shadow-red-900/40"
          >
            <MdOutlineExplore />
            Explore now
          </Button>

          <Link
            href={`/book/${book?._id}`}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:shadow-green-900/40 dark:focus-visible:ring-offset-zinc-900"
          >
            View details
            <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
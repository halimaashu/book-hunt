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
      ? { text: "Out of stock", style: "bg-red-100 text-red-700" }
      : qty <= 5
      ? { text: `Only ${qty} left`, style: "bg-amber-100 text-amber-700" }
      : { text: `${qty} in stock`, style: "bg-green-100 text-green-700" };

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
        <Image
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          src={book?.image_url}
          fill
          alt={book?.title || "Book cover"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Category badge */}
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
          {book?.category}
        </span>

        {/* Stock badge */}
        <span
          className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${stock.style}`}
        >
          {stock.text}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-green-600">
          {book?.title}
        </h3>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <FaUserEdit className="text-slate-400" />
          {book?.author}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {book?.description}
        </p>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button
            isDisabled={qty === 0}
            className="rounded-xl bg-[#e7000b] text-sm font-semibold text-white shadow-md shadow-red-200 hover:bg-red-700"
          >
            <MdOutlineExplore />
            Explore now
          </Button>

          <Link
            href={`/book/${book?.id}`}
            className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-green-200 transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            View details
            <FaArrowRight className="text-xs transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
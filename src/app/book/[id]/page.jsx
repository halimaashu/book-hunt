import BookActions from "@/components/ui/BookActions"; // Buy now + Wishlist
import { getAllBooks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { FiArrowLeft, FiUser, FiTag, FiPackage, FiShield, FiTruck } from "react-icons/fi";

// Reads the id from the URL, whatever the folder is named ([_id], [id], [bookId]...)
async function getIdFromParams(params) {
  const p = await params;
  return p._id ?? p.id ?? p.bookId ?? Object.values(p)[0];
}

// Finds the book by its database _id (or id), works for strings and Mongo ObjectIds
async function findBook(id) {
  const data = (await getAllBooks()) || [];

  // TEMPORARY: shows in your terminal. Remove it when the page works.
  console.log("book detail lookup:", {
    idFromUrl: id,
    totalBooks: data.length,
    firstBookKeys: Object.keys(data[0] || {}),
    firstBookId: data[0]?._id ?? data[0]?.id,
  });

  return data.find((d) => String(d._id ?? d.id) === String(id));
}

export async function generateMetadata({ params }) {
  const _id = await getIdFromParams(params);
  const book = await findBook(_id);
  return {
    title: book ? `${book.title} | BooksHunt` : "Book not found | BooksHunt",
    description: book?.description,
  };
}

export default async function ViewDetailPage({ params }) {
  const _id = await getIdFromParams(params);
  const book = await findBook(_id);

  // Shows the 404 page instead of crashing when the book does not exist
  if (!book) notFound();

  const qty = Number(book.available_quantity ?? 0);
  const stock =
    qty === 0
      ? { text: "Out of stock", style: "bg-red-100 text-red-700" }
      : qty <= 5
      ? { text: `Only ${qty} left`, style: "bg-amber-100 text-amber-700" }
      : { text: `${qty} in stock`, style: "bg-green-100 text-green-700" };

  const facts = [
    { icon: FiUser, label: "Author", value: book.author },
    { icon: FiTag, label: "Category", value: book.category },
    { icon: FiPackage, label: "Available", value: `${qty} pieces` },
  ];

  return (
    <main className="bg-slate-50">
      <div className="container mx-auto px-5 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/allBooks"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-green-700"
        >
          <FiArrowLeft />
          Back to all books
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Cover */}
          <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-24">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-3xl bg-gradient-to-br from-[#e7000b] to-green-500 opacity-20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100 shadow-2xl">
              <Image
                src={book.image_url}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 448px"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow backdrop-blur">
                {book.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold ${stock.style}`}>
                {stock.text}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-[#e7000b] to-green-500 bg-clip-text text-transparent">
                  {book.title}
                </span>
              </h1>
              <p className="mt-2 text-lg font-semibold text-slate-600">by {book.author}</p>
              {book.price != null && book.price !== "" && (
                <p className="mt-4 text-4xl font-extrabold text-[#e7000b]">
                  ৳{Number(book.price).toLocaleString("en-US")}
                </p>
              )}
            </div>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              {book.description}
            </p>

            {/* Quick facts */}
            <div className="grid gap-3 sm:grid-cols-3">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <Icon className="text-xl text-green-600" />
                  <p className="mt-3 text-xs font-medium text-slate-400">{label}</p>
                  <p className="truncate text-sm font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Actions: pass plain strings/numbers only (ObjectId cannot go to client components) */}
            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <BookActions bookId={String(book._id ?? book.id)} stock={qty} />
            </div>

            {/* Trust row */}
            <ul className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-lg text-green-600">
                  <FiShield />
                </span>
                100% original book
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-lg text-red-600">
                  <FiTruck />
                </span>
                Tracked delivery to your door
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
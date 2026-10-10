import { getAllBooks } from "@/lib/data";
import { Table } from "@heroui/react";
import Link from "next/link";
import React from "react";
import DeleteBookButton from "@/components/shared/DeleteBookButton";
import {
  FiBook,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiSearch,
  FiX,
  FiPlusCircle,
  FiEdit2,
  FiEye,
} from "react-icons/fi";

const stockBadge = (qty) => {
  if (qty === 0) return { text: "Out of stock", style: "bg-red-100 text-red-700" };
  if (qty <= 5) return { text: `Only ${qty} left`, style: "bg-amber-100 text-amber-700" };
  return { text: `${qty} in stock`, style: "bg-green-100 text-green-700" };
};

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const query = params?.query?.toString().trim() || "";
  const category = params?.category?.toString() || "";

  const allBooks = (await getAllBooks()) || [];

  // Stats use all books, the table uses the filtered list
  const qtyOf = (b) => Number(b.available_quantity ?? 0);
  const inStock = allBooks.filter((b) => qtyOf(b) > 5).length;
  const lowStock = allBooks.filter((b) => qtyOf(b) > 0 && qtyOf(b) <= 5).length;
  const outOfStock = allBooks.filter((b) => qtyOf(b) === 0).length;

  const categories = [...new Set(allBooks.map((b) => b.category).filter(Boolean))];

  const books = allBooks.filter((b) => {
    const matchesCategory = category
      ? b.category?.toLowerCase() === category.toLowerCase()
      : true;
    const q = query.toLowerCase();
    const matchesQuery = q
      ? b.title?.toLowerCase().includes(q) || b.author?.toLowerCase().includes(q)
      : true;
    return matchesCategory && matchesQuery;
  });

  const stats = [
    { label: "Total books", value: allBooks.length, icon: FiBook, color: "bg-blue-100 text-blue-600" },
    { label: "In stock", value: inStock, icon: FiCheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Low stock", value: lowStock, icon: FiAlertTriangle, color: "bg-amber-100 text-amber-600" },
    { label: "Out of stock", value: outOfStock, icon: FiXCircle, color: "bg-red-100 text-red-600" },
  ];

  const filterHref = (value) => {
    const qs = new URLSearchParams();
    if (value) qs.set("category", value);
    if (query) qs.set("query", query);
    const str = qs.toString();
    return str ? `/dashboard/admin/books?${str}` : "/dashboard/admin/books";
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Manage books
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View, edit and remove the books in your store.
          </p>
        </div>
        <Link
          href="/dashboard/admin/add-book"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <FiPlusCircle />
          Add new book
        </Link>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl ${color}`}>
              <Icon />
            </span>
            <p className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">{value}</p>
            <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {["", ...categories].map((c) => (
            <Link
              key={c || "all"}
              href={filterHref(c)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition ${
                category.toLowerCase() === c.toLowerCase()
                  ? "bg-green-600 text-white shadow-md shadow-green-200"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {c || "All"}
            </Link>
          ))}
        </div>

        <form
          method="get"
          className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm lg:max-w-sm"
        >
          {category && <input type="hidden" name="category" value={category} />}
          <FiSearch className="ml-3 shrink-0 text-lg text-slate-400" />
          <input
            name="query"
            type="text"
            defaultValue={query}
            placeholder="Search by title or author..."
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </section>

      {/* Table */}
      {books.length > 0 ? (
        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Manage books table" className="min-w-[820px]">
                <Table.Header>
                  <Table.Column isRowHeader>Book</Table.Column>
                  <Table.Column>Category</Table.Column>
                  <Table.Column>Stock</Table.Column>
                  <Table.Column>ID</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {books.map((book) => {
                    const badge = stockBadge(qtyOf(book));
                    return (
                      <Table.Row key={book._id} id={String(book._id)}>
                        {/* Book: cover, title, author */}
                        <Table.Cell>
                          <div className="flex items-center gap-4 py-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={book.image_url}
                              alt={book.title}
                              className="h-16 w-12 shrink-0 rounded-md bg-slate-100 object-cover shadow"
                            />
                            <div className="min-w-0 max-w-[260px]">
                              <p className="truncate font-semibold text-slate-900">{book.title}</p>
                              <p className="truncate text-xs text-slate-500">by {book.author}</p>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Category */}
                        <Table.Cell>
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                            {book.category}
                          </span>
                        </Table.Cell>

                        {/* Stock */}
                        <Table.Cell>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${badge.style}`}>
                            {badge.text}
                          </span>
                        </Table.Cell>

                        {/* ID */}
                        <Table.Cell>
                          <span className="text-sm font-medium text-slate-500">#{book.id}</span>
                        </Table.Cell>

                        {/* Actions */}
                        <Table.Cell>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/book/${book._id}`}
                              aria-label={`View ${book.title}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                            >
                              <FiEye />
                            </Link>
                            <Link
                              href={`/dashboard/admin/books/${book._id}/edit`}
                              aria-label={`Edit ${book.title}`}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition hover:bg-green-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                            >
                              <FiEdit2 />
                            </Link>
                            <DeleteBookButton id={book._id} title={book.title} />
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            <Table.Footer>
              <p className="px-5 py-4 text-sm text-slate-500">
                Showing <span className="font-bold text-slate-900">{books.length}</span> of{" "}
                {allBooks.length} books
              </p>
            </Table.Footer>
          </Table>
        </section>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
            <FiSearch />
          </span>
          <h2 className="mt-5 text-lg font-bold text-slate-900">No books found</h2>
          <p className="mt-2 text-sm text-slate-500">
            Try a different title or author, or clear the filters.
          </p>
          <Link
            href="/dashboard/admin/books"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FiX />
            Clear filters
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
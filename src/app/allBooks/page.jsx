import Book from "@/components/ui/Book";
import { getAllBooks } from "@/lib/data";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";

const categories = ["All", "Story", "Tech", "Science"];

export default async function AllPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category;
  const query = params?.query;

  const allBooks = await getAllBooks();

  const filter = allBooks.filter((book) => {
    const matchesCategory = category
      ? book.category?.toLowerCase() === category.toLowerCase()
      : true;

    const matchesSearch = query
      ? book.title?.toLowerCase().includes(query.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  // Search keeps the selected category
  async function handleSearch(formData) {
    "use server";
    const searchTerm = formData.get("search")?.toString().trim();
    const currentCategory = formData.get("category")?.toString();

    const qs = new URLSearchParams();
    if (currentCategory) qs.set("category", currentCategory);
    if (searchTerm) qs.set("query", searchTerm.toLowerCase());

    const str = qs.toString();
    redirect(str ? `/allBooks?${str}` : "/allBooks");
  }

  // Build a category link that keeps the current search
  const categoryHref = (cat) => {
    const qs = new URLSearchParams();
    if (cat !== "All") qs.set("category", cat);
    if (query) qs.set("query", query);
    const str = qs.toString();
    return str ? `/allBooks?${str}` : "/allBooks";
  };

  const isActive = (cat) =>
    cat === "All" ? !category : category?.toLowerCase() === cat.toLowerCase();

  return (
    <main className="bg-slate-50 transition-colors duration-300 dark:bg-zinc-950">
      {/* Page header */}
      <section className="border-b border-slate-100 bg-gradient-to-br from-green-50 via-white to-red-50 dark:border-slate-800 dark:from-green-950/40 dark:via-zinc-950 dark:to-red-950/30">
        <div className="container mx-auto px-5 py-10 text-center sm:py-14">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-green-700 shadow-sm dark:bg-zinc-900 dark:text-green-300 dark:ring-1 dark:ring-slate-800 sm:text-sm">
            <FaBookOpen />
            Our library
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Explore all books
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Search by title or pick a category to find your next original read.
          </p>

          {/* Search */}
          <form
            action={handleSearch}
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/60 dark:border-slate-700 dark:bg-zinc-900 dark:shadow-black/40"
          >
            {category && <input type="hidden" name="category" value={category} />}
            <FiSearch className="ml-3 shrink-0 text-xl text-slate-400 dark:text-slate-500" />
            <input
              name="search"
              type="text"
              placeholder="Search by title..."
              defaultValue={query || ""}
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500 sm:text-base"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#e7000b] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-900"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="container mx-auto px-5 py-8 sm:py-12">
        {/* Category filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={categoryHref(cat)}
                aria-current={isActive(cat) ? "true" : undefined}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                  isActive(cat)
                    ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-900/40"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-green-300 hover:text-green-700 dark:border-slate-700 dark:bg-zinc-900 dark:text-slate-300 dark:hover:border-green-500/60 dark:hover:text-green-400"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-900 dark:text-white">{filter.length}</span>{" "}
            {filter.length === 1 ? "book" : "books"}
            {query && (
              <>
                {" "}for{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  &quot;{query}&quot;
                </span>
              </>
            )}
          </p>
        </div>

        {/* Results */}
        {filter.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filter.map((book) => (
              <Book key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-zinc-900">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400 dark:bg-zinc-800 dark:text-slate-500">
              <FiSearch />
            </span>
            <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
              No books found
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try a different title or choose another category.
            </p>
            <Link
              href="/allBooks"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <FiX />
              Clear filters
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
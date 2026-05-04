import Book from "@/components/ui/Book";
import { getAllBooks } from "@/lib/data";
import { Button } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AllPage({ searchParams }) {
  const params = await searchParams;
  const category = params.category;
  const query = params.query;

  const allBooks = await getAllBooks();

  const filter = allBooks.filter((book) => {
    const matchesCategory = category
      ? book.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchesSearch = query
      ? book.title.toLowerCase().includes(query.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  async function handelSearch(formData) {
    "use server";
    const searchTerm = formData.get("search");

    if (searchTerm) {
      redirect(`/allBooks?query=${searchTerm.toLowerCase()}`);
    } else {
      redirect(`/allBooks`);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">All Books</h1>

      <div className="flex space-x-3 mb-6">
        <Link href="/allBooks">
          <Button variant="outline">All</Button>
        </Link>
        <Link href="/allBooks?category=Story">
          <Button variant="outline">Story</Button>
        </Link>
        <Link href="/allBooks?category=Tech">
          <Button variant="outline">Tech</Button>
        </Link>
        <Link href="/allBooks?category=Science">
          <Button variant="outline">Science</Button>
        </Link>
      </div>

      <div className="mb-10 flex justify-end items-center">
        <form action={handelSearch} className="flex gap-2">
          <input
            name="search"
            type="text"
            placeholder="Search by title..."
            className="border p-2 rounded text-black w-full max-w-xs"
            defaultValue={query || ""}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
        {filter.length > 0 ? (
          filter.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <p className="text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
}

import { getAllBooks } from "@/lib/data";
import React from "react";
import Book from "../ui/Book";

export default async function SpeachileBooks() {
  const books = await getAllBooks();
  console.log(books, "fro speachile pages");
  const specialBooks = books.slice(7, 12);
  return (
    <div className="container mx-auto  py-10 px-3">
      <h1 className="text-2xl font-bold mb-6">Special Books</h1>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {specialBooks.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

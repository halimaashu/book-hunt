import { getAllBooks } from "@/lib/data";
import React from "react";
import Book from "../ui/Book";

export default async function SpeachileBooks() {
  const books = await getAllBooks();
  console.log(books, "fro speachile pages");
  const specialBooks = books.slice(7, 12);
  return (
    <div className="container mx-auto  py-10 px-3">
      <h1 className="bg-gradient-to-r from-red-600 to-green-500 bg-clip-text text-transparent text-3xl md:text-5xl font-bold text-center">Special Books</h1>
      <p className="mt-4 text-gray-500 text-base md:text-lg text-center">Discover handpicked books that readers are loving right now.</p>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {specialBooks.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

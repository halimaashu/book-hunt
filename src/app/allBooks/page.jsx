import Book from "@/components/ui/Book";
import { getAllBooks } from "@/lib/data";
import React from "react";

export default async function AllPage() {
  const allBooks = await getAllBooks();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">All Books</h1>
      <div className="grid grid-cols-3 gap-10 p-5">{
        allBooks.map(book=><Book key={book.id} book={book}/>)
        
        }</div>
    </div>
  );
}

import Book from "@/components/ui/Book";
import { getAllBooks } from "@/lib/data";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

export default async function AllPage({searchParams}) {
  const {category}=await searchParams
  // console.log(category,"category from all books pages;;;;;;;;;;;;;;;;")
  const allBooks = await getAllBooks();
  const filter=category? allBooks.filter(all=>all.category.toLowerCase()==category.toLowerCase()):allBooks;
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">All Books</h1>
      {/* categories button */}
      <div className="flex space-x-3">
        <Link href={"/allBooks"}><Button variant="outline">All</Button></Link>
        <Link href={"/allBooks/?category=Story"}><Button variant="outline">Story</Button></Link>
        <Link href={"/allBooks/?category=Tech"}><Button variant="outline">Tech</Button></Link>
        <Link href={"/allBooks/?category=Science"}><Button variant="outline">Science</Button></Link>
        

      </div>
      <div className="grid grid-cols-3 gap-10 p-5">{
        filter.map(book=><Book key={book.id} book={book}/>)
        
        }</div>
    </div>
  );
}

import BookActions from "@/components/ui/BookActions"; // new: Buy now + Wishlist
import { getAllBooks } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function ViewDetailPage({ params }) {
  const { id } = await params;
  const data = await getAllBooks();
  const exceptedBooks = data.find((d) => d._id == id);

  // Shows the 404 page instead of crashing when the book id does not exist
  if (!exceptedBooks) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
      <div className="container mx-auto items-center gap-10 p-2 py-20 md:flex">
        <div>
          <Image
            src={exceptedBooks?.image_url}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            height={600}
            width={600}
            alt={exceptedBooks.title}
            className="rounded-lg shadow-lg dark:shadow-black/60"
          />
        </div>
        <div className="space-y-4">
          <h1 className="bg-gradient-to-r from-pink-400 to-green-500 bg-clip-text text-5xl font-bold text-transparent">
            {exceptedBooks.title}
          </h1>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Author: {exceptedBooks?.author}
          </h2>
          <p className="text-xl font-semibold text-gray-500 dark:text-slate-400">
            {exceptedBooks?.description}
          </p>
          <p className="text-xl font-semibold text-gray-500 dark:text-slate-400">
            Available: {exceptedBooks?.available_quantity} pieces
          </p>

          {/* Replaces the old MorrowNawButton */}
          <BookActions
            bookId={exceptedBooks.id}
            stock={exceptedBooks?.available_quantity}
          />
        </div>
      </div>
    </main>
  );
}
// import React from 'react';

// const page = () => {
//   return (
//     <div>
//       this is book detail pages
//     </div>
//   );
// };

// export default page;
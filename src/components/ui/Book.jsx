import { AlertDialog, Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineExplore } from "react-icons/md";

export default function Book({ book }) {
  return (
    <Card className="hover:shadow-lg transition duration-300 p-5 border">
      <div className="relative aspect-square w-full overflow-hidden">
        <span className="absolute top-6 left-90 z-50 bg-blue-600  text-white text-sm px-3 py-1 rounded-full shadow-md">
          {book.category}
        </span>
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={book?.image_url}
          fill
          alt={book.title}
          className="object-cover rounded-lg "
        />
      </div>
      <h1 className="text-xl font-bold ">{book.title}</h1>

      <div className=" flex  justify-between  p-2">
        <Button variant="outline" className={""}>
          <MdOutlineExplore /> Explore Naw
        </Button>
        <Link href={`/book/${book.id}`}>
          <Button className="bg-[#FFA931]  hover:shadow-xl">
            View details
          </Button>
        </Link>
      </div>
    </Card>
  );
}

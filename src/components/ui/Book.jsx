import { AlertDialog, Button, Card } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { MdOutlineExplore } from "react-icons/md";

export default function Book({ book }) {
  return (
    <Card className="hover:shadow-lg transition duration-300 p-5">
      <div className="relative aspect-square w-full overflow-hidden">
        <span className="absolute top-1 left-1 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
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
        <Button className="bg-[#FFA931]  hover:shadow-xl">View details</Button>
      </div>
    </Card>
  );
}

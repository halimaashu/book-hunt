import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaFirefoxBrowser } from "react-icons/fa";

export default function Banner() {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between p-5 bg-blue-50 container mx-auto">
      <div className="md:flex-1">
        <h1 className="text-5xl md:text-6xl font-bold">Find Your Next Read</h1>
        <h1 className="text-4xl mt-10  font-bold bg-gradient-to-r from-[#FFA931] to-green-500 text-transparent bg-clip-text ">
          BooksHunt
        </h1>

        <p className="font-semibold text-gray-500 mt-5 max-w-xl">
          Discover thousands of books across different genres and start your
          next reading journey today.
        </p>

        <div className="mt-10 mx-auto w-1/2">
          <Link href="/books" className="inline-block hover:animate-bounce">
            <Button className="flex items-center gap-2 bg-[#FFA931]">
              <FaFirefoxBrowser />
              Browse Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 mt-10 md:mt-0 ">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={heroBg}
          width={450}
          height={450}
          alt="hero-banner"
          className="mx-auto rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}

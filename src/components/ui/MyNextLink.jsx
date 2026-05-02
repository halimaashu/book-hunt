"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MyNextLink({ href, children }) {
  const pathName = usePathname();
  console.log(pathName, "from my next linkpages");
  return (
    <div>
      <Link
        className={`text-base ${pathName === href ? "text-blue-500 font-semibold" : ""}`}
        href={href}
      >
        {children}
      </Link>
    </div>
  );
}

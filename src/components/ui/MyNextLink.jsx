"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function MyNextLink({href,children}) {
    const pathName=usePathname();
    console.log(pathName,"from my next linkpages")
  return (
    <div>
      <Link className={pathName==href&&"font-medium text-blue-500 border-b border-blue-500"} href={href}>{children}

      </Link>
    </div>
  )
}

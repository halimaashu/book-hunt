import { Button } from '@heroui/react'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='bg-base-300 shadow-2xl md:w-1/2 h-screen mx-auto flex flex-col items-center justify-center gap-10'>
      <h1 className='text-6xl font-bold text-green-500'>-404</h1>
      <h1 className='text-3xl font-bold text-gray-400'>This Pge is not | found</h1>
     <Link href={"/"}>
      <Button className={"rounded-md px-10"} >
        go HOME
      </Button>
     </Link>
    </div>
  )
}

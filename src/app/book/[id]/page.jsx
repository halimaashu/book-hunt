

import { getAllBooks } from '@/lib/data';
import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react'

export default async function ViewDetailPage({params}) {
    const {id}=await params;
    console.log(id,"path name from detail pages")
    const data=await getAllBooks();
    const exceptedBooks=data.find(d=>d.id==id)
  return (
    <div className='container mx-auto py-20 flex items-center gap-10'>
      
     <div className="">
       <Image src={exceptedBooks?.image_url} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" height={600} width={600} alt={exceptedBooks.title} className='rounded-lg shadow-lg'/>
     </div>
      <div className="space-y-4">
        <h1 className='text-5xl font-bold bg-gradient-to-r from-pink-400 to-green-500 text-transparent bg-clip-text'>{exceptedBooks.title}</h1>
        <h1  className='text-2xl font-bold'>Author: {exceptedBooks?.author}</h1>
        <h1 className='text-xl font-semibold text-gray-500'>{exceptedBooks?.description}</h1>
        <h1 className='text-xl font-semibold text-gray-500'>Available:  {exceptedBooks?.available_quantity} pice</h1>
        <Button className={"text-right flex justify-center items-center mx-auto mt-20 max-w-[200px]"}>Borrow This Book</Button>


      </div>
    </div>
  )
}

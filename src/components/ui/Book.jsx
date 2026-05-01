import { Card } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

export default function Book({book}) {
  return (
    <Card>
        <div className="">
            <Image src={book?.image_url} height={100} width={100} alt={book.title}/>
        </div>
      <h1 className='text-xl font-bold'>{book.title}</h1>
    </Card>
  )
}

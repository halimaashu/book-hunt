import { getAllBooks } from '@/lib/data'
import React from 'react'
import Book from '../ui/Book'

export default async function SpeachileBooks() {
const books=await getAllBooks()
console.log(books,"fro speachile pages")
const SpecialBooks=books.slice(0,5)
  return (
    
  <div className="container mx-auto  py-10">
    <h1 className='text-2xl font-bold mb-6'>Special Books</h1>
      <div className=' grid grid-cols-3 gap-10'>
        
      {
        SpecialBooks.map(book=><Book key={book.id} book={book}/>)
      }
    </div>
  </div>
  )
}

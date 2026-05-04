import React from 'react'
import Marquee from 'react-fast-marquee'
import UserReview from './UserReview'

export default function UserreviewMarque() {
  return (
    <div className='py-20  container mx-auto'>
        <h1 className='text-2xl font-bold mb-5'>Uer Review</h1>
      <Marquee pauseOnHover >
       <UserReview/>
       <UserReview/>

      </Marquee>
    </div>
  )
}

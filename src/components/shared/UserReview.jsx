import { getAllReview } from "@/lib/data";
import { Avatar } from "@heroui/react";
import React from "react";
import Marquee from "react-fast-marquee";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Updock } from 'next/font/google';
  const updock = Updock({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})
export default async function UserReview() {
  const review = await getAllReview();
  const reviews = review?.reviews;
  console.log(reviews, "from user review component");
;

  return (
    <div className="m-10">{
    
      reviews?.length > 0 ? (<div className=" py-10  flex gap-10 items-center-center justify-center">{
        reviews?.map((review) => (
          <div key={review.id} className="flex flex-col  justify-center gap-5 bg-[#F5F5F5] p-5 rounded-lg shadow-md w-[300px]">
            <FaQuoteLeft className="text-left text-red-500" />
            <h1 className={updock.className + " text-left text-3xl text-green-600 font-semibold"}>{review.user_name}</h1>
            <div className="star-box flex gap-1 items-center ">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
            <p className="text-gray-600">{review.review_text
}</p>
          </div>
        ))}
      </div>):(
        <div className=""> 
        <h1>there is no review available</h1>
        </div>
      )
}

    </div>
  );
}

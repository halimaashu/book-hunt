import { getAllReview } from "@/lib/data";
import { Avatar } from "@heroui/react";
import React from "react";
import Marquee from "react-fast-marquee";

export default async function UserReview() {
  const review = await getAllReview();
  const reviews = review?.reviews;

  return (
    <div className="container mx-auto">
    
      <div className="flex gap-10">
        {reviews.map((review) => (
          <div className="border w-full px-10 py-2 rounded-lg" key={review.id}>
            

            <Avatar>
              <Avatar.Image
                alt="John Doe"
                src={review.image}
              />
              <Avatar.Fallback>{review?.user_name[0]}</Avatar.Fallback>
            </Avatar>
            <h1 className="font-semibold">{review?.user_name}</h1>

            <h1 className=" text-gray-500">Reviewed: { review?.book_reviewed}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

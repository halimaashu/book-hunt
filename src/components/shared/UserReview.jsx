import { getAllReview } from "@/lib/data";
import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Updock } from "next/font/google";

const updock = Updock({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default async function UserReview() {
  const review = await getAllReview();
  const reviews = review?.reviews;

  return (
    <section className="bg-white px-4 py-10 transition-colors duration-300 dark:bg-zinc-950 sm:px-10">
      {reviews?.length > 0 ? (
        <div className="flex flex-wrap items-stretch justify-center gap-6 py-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex w-[300px] flex-col justify-center gap-5 rounded-lg border border-transparent bg-[#F5F5F5] p-5 shadow-md transition-colors duration-300 dark:border-slate-800 dark:bg-zinc-900 dark:shadow-black/40"
            >
              <FaQuoteLeft className="text-left text-red-500" />
              <h1
                className={
                  updock.className +
                  " text-left text-3xl font-semibold text-green-600 dark:text-green-400"
                }
              >
                {review.user_name}
              </h1>
              <div className="star-box flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-slate-400">{review.review_text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center">
          <h1 className="text-slate-700 dark:text-slate-300">
            There are no reviews available
          </h1>
        </div>
      )}
    </section>
  );
}
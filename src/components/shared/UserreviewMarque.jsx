import React from "react";
import Marquee from "react-fast-marquee";
import UserReview from "./UserReview";

export default function UserreviewMarque() {
  return (
    <div className="py-20 text-center ">
       <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
      What our{" "}
      <span className="bg-gradient-to-r from-red-600 to-green-500 bg-clip-text text-transparent">
        readers
      </span>{" "}
      are saying
    </h2>

    <p className="mt-4 text-gray-500 text-base md:text-lg">
      Real feedback from book lovers who found their next favorite read with us.
    </p>
      <Marquee>
        <UserReview />
        <UserReview />
      </Marquee>
    </div>
  );
}

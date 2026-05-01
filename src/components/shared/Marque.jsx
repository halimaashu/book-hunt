import { Button } from "@heroui/react";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Marque() {
    const discountNews=["New Arrivals: story | Special Discount on Memberships...","New Arrivals: Science | Special Discount on Memberships...","New Arrivals: robotics | Special Discount on Memberships..."]
  return (
    <div className="flex items-center gap-5 container mx-auto bg-[#FECB89] px-5 rounded-md">
     <Button className={"bg-red-500 rounded-lg"}>Speachile discount:</Button>
      <Marquee className="bg-gray-00 p-5">
       {
        discountNews.map(n=>n)
       }
      </Marquee>
    </div>
  );
}

import { Button } from "@heroui/react";
import React from "react";
import Marquee from "react-fast-marquee";

export default function Marque() {
  const discountNews = [
    "New Arrivals: Story | Special Discount on Memberships",
    " New Arrivals: Science | Special Discount on Memberships",
    " New Arrivals: Robotics | Special Discount on Memberships",
  ];
  return (
    <div className="flex items-center gap-5 container mx-auto bg-[#FECB89] px-5 rounded-md">
      <Button className={"bg-red-500 rounded-lg"}> Special Discount</Button>
      <Marquee pauseOnHover speed={50} className="bg-gray-200 p-5 ">
        {discountNews.map((n) => n)}
      </Marquee>
    </div>
  );
}

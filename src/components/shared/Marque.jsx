import React from "react";
import Marquee from "react-fast-marquee";
import { FaBolt, FaBookOpen } from "react-icons/fa";

const discountNews = [
  { category: "Story", text: "New arrivals" },
  { category: "Science", text: "New arrivals" },
  { category: "Robotics", text: "New arrivals" },
];

export default function Marque() {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="container mx-auto flex items-stretch overflow-hidden rounded-2xl bg-slate-900 shadow-xl shadow-slate-900/20">
        {/* Label */}
        <div className="flex shrink-0 items-center gap-2 bg-[#e7000b] px-4 py-4 text-white sm:gap-3 sm:px-8">
          <FaBolt className="animate-pulse text-lg sm:text-xl" />
          <h2 className="text-sm font-extrabold uppercase tracking-wide sm:text-lg">
            <span className="hidden sm:inline">Special </span>Discount
          </h2>
        </div>

        {/* Scrolling text */}
        <Marquee pauseOnHover speed={50} gradient={false} className="py-4">
          {discountNews.map((item) => (
            <div key={item.category} className="flex items-center">
              <span className="flex items-center gap-2 px-6 text-sm font-extrabold text-white sm:text-lg">
                <FaBookOpen className="text-green-400" />
                {item.text}:
                <span className="rounded-full bg-green-500 px-3 py-0.5 text-xs font-extrabold text-white sm:text-sm">
                  {item.category}
                </span>
                <span className="text-yellow-300">Special discount on memberships</span>
              </span>
              <span className="h-2 w-2 rounded-full bg-red-500" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
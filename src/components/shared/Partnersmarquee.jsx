import React from "react";
import Marquee from "react-fast-marquee";
import {
  FaFeatherAlt,
  FaBookOpen,
  FaGlobeAsia,
  FaRocket,
  FaLeaf,
  FaBookmark,
} from "react-icons/fa";
import { FiSun, FiAnchor, FiHexagon, FiCompass, FiLayers, FiZap } from "react-icons/fi";

// All companies below are fictional (demo data)
const rowOne = [
  { name: "PageTurn Press", icon: FaBookOpen, color: "bg-red-600" },
  { name: "Nova Reads", icon: FaRocket, color: "bg-indigo-600" },
  { name: "Lumina Books", icon: FiSun, color: "bg-amber-500" },
  { name: "Inkwell & Co", icon: FaFeatherAlt, color: "bg-slate-800" },
  { name: "BrightShelf", icon: FiLayers, color: "bg-green-600" },
  { name: "Orbit Publishing", icon: FaGlobeAsia, color: "bg-sky-600" },
];

const rowTwo = [
  { name: "Paperlane", icon: FiCompass, color: "bg-pink-600" },
  { name: "Bookly Bay", icon: FiAnchor, color: "bg-teal-600" },
  { name: "Quill & Co", icon: FaBookmark, color: "bg-purple-600" },
  { name: "Atlas Reads", icon: FiHexagon, color: "bg-orange-600" },
  { name: "Verse Hub", icon: FiZap, color: "bg-blue-600" },
  { name: "Chapter One", icon: FaLeaf, color: "bg-emerald-600" },
];

function Logo({ name, icon: Icon, color }) {
  return (
    <div className="mx-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:mx-4 sm:px-6 sm:py-4">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg text-white sm:h-12 sm:w-12 sm:text-xl ${color}`}
      >
        <Icon />
      </span>
      <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-slate-800 sm:text-xl">
        {name}
      </span>
    </div>
  );
}

export default function PartnersMarquee() {
  return (
    <section className="overflow-hidden bg-slate-50 py-14 sm:py-20">
      <div className="container mx-auto px-5 text-center">
        <p className="inline-flex rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 sm:text-sm">
          Our partners
        </p>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Trusted by leading publishers and book partners
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
          We work with respected publishers so every book you order is original.
        </p>
      </div>

      <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
        {/* Row 1: moves right to left */}
        <Marquee
          direction="left"
          speed={40}
          pauseOnHover
          gradient
          gradientColor="#f8fafc"
          gradientWidth={80}
        >
          {rowOne.map((c) => (
            <Logo key={c.name} {...c} />
          ))}
        </Marquee>

        {/* Row 2: moves left to right */}
        <Marquee
          direction="right"
          speed={40}
          pauseOnHover
          gradient
          gradientColor="#f8fafc"
          gradientWidth={80}
        >
          {rowTwo.map((c) => (
            <Logo key={c.name} {...c} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
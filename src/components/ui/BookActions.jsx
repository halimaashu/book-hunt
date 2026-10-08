"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const WISHLIST_KEY = "wishlist";

// Reads the saved wishlist (array of book ids) from localStorage
function readWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export default function BookActions({ bookId, stock = 0 }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [wished, setWished] = useState(false);
  const [mounted, setMounted] = useState(false);
  const outOfStock = Number(stock) === 0;

  // Load the saved state after mount (avoids a hydration mismatch)
  useEffect(() => {
    setWished(readWishlist().includes(String(bookId)));
    setMounted(true);
  }, [bookId]);

  const handleBuyNow = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    // TODO: change this to your real checkout route
    router.push(`/checkout/${bookId}`);
  };

  const handleWishlist = () => {
    const list = readWishlist();
    const id = String(bookId);
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    } catch {}
    setWished(next.includes(id));

    // TODO: if you store wishlists in your database, call your API here
  };

  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      {/* Buy now */}
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={outOfStock}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950"
      >
        <FiShoppingCart className="text-lg" />
        {outOfStock ? "Out of stock" : "Buy now"}
      </button>

      {/* Add to wishlist (toggles) */}
      <button
        type="button"
        onClick={handleWishlist}
        aria-pressed={mounted && wished}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-8 py-3.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
          mounted && wished
            ? "border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-zinc-900 dark:text-slate-200 dark:hover:bg-zinc-800"
        }`}
      >
        {mounted && wished ? (
          <FaHeart className="text-lg text-red-600 dark:text-red-400" />
        ) : (
          <FaRegHeart className="text-lg" />
        )}
        {mounted && wished ? "In wishlist" : "Add to wishlist"}
      </button>
    </div>
  );
}
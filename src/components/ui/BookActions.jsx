"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart, FiX, FiCheckCircle, FiMinus, FiPlus } from "react-icons/fi";


const WISHLIST_KEY = "wishlist";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const paymentMethods = ["Cash on delivery", "bKash", "Nagad", "Card (Stripe)"];

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-green-900";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

// Reads the saved wishlist (array of book ids) from localStorage
function readWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export default function BookActions({ bookId, stock = 0, title = "", price = 0 }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [wished, setWished] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(null); // holds the order data after submit

  const stockNumber = Number(stock);
  const unitPrice = Number(price) || 0;
  const outOfStock = stockNumber === 0;
  const noPrice = unitPrice <= 0;
  const total = unitPrice * quantity;

  // Load the saved state after mount (avoids a hydration mismatch)
  useEffect(() => {
    setWished(readWishlist().includes(String(bookId)));
    setMounted(true);
  }, [bookId]);

  // Close the form with the Escape key and stop the page behind from scrolling
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeForm();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openForm = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setQuantity(1);
    setSubmitted(null);
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
    setSubmitted(null);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

    const order = {
      // product details
      bookId: String(bookId),
      bookTitle: title,
      unitPrice,
      quantity,
      totalPrice: total,
      // customer details
      ...formData,
      
    };

    console.log("Buy form data:", order);
    setSubmitted(order);
    const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}order`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(order)
    })
    const data=await res.json()
    console.log(data,"from my server response")
    window.location.replace(data.url)


    // TODO: send `order` to your API here, then go to payment
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
    <>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        {/* Buy now */}
        <button
          type="button"
          onClick={openForm}
          disabled={outOfStock || noPrice}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950"
        >
          <FiShoppingCart className="text-lg" />
          {outOfStock ? "Out of stock" : noPrice ? "Price coming soon" : "Buy now"}
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

      {/* Buy form (modal) */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/60 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={closeForm}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-title"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:border dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-zinc-800 sm:px-8">
              <h2 id="buy-title" className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                {submitted ? "Order details received" : "Complete your order"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close"
                className="rounded-full p-2 text-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800"
              >
                <FiX />
              </button>
            </div>

            {/* Success */}
            {submitted ? (
              <div className="overflow-y-auto px-5 py-8 text-center sm:px-8">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 dark:bg-green-500/20 dark:text-green-400">
                  <FiCheckCircle />
                </span>
                <p className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                  Thank you, {submitted.fullName}!
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Your details for <span className="font-semibold">{submitted.bookTitle}</span> were
                  captured. Open the browser console to see the form data.
                </p>
                <button
                  type="button"
                  onClick={closeForm}
                  className="mt-6 rounded-xl bg-green-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="space-y-6 overflow-y-auto px-5 py-6 sm:px-8">
                  {/* Product summary */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-xs font-medium text-slate-400">Product</p>
                    <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">{title}</p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium text-slate-400">Price</p>
                        <p className="text-lg font-extrabold text-[#e7000b] dark:text-red-400">
                          ৳{unitPrice.toLocaleString("en-US")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">Quantity</p>
                        <div className="mt-1 flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                            aria-label="Decrease quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-zinc-800"
                          >
                            <FiMinus />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-900 dark:text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.min(stockNumber, q + 1))}
                            disabled={quantity >= stockNumber}
                            aria-label="Increase quantity"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-zinc-800"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-medium text-slate-400">Total</p>
                        <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                          ৳{total.toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact details */}
                  <fieldset className="space-y-4">
                    <legend className="mb-1 text-sm font-extrabold uppercase tracking-wide text-slate-400">
                      Contact details
                    </legend>

                    <div>
                      <label htmlFor="fullName" className={labelClass}>Full name</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        minLength={3}
                        defaultValue={user?.name || ""}
                        placeholder="Your full name"
                        autoComplete="name"
                        className={fieldClass}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone / WhatsApp</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          pattern="^(?:\+?88)?01[3-9]\d{8}$"
                          title="Enter a valid Bangladesh number, for example 01712345678"
                          placeholder="01XXXXXXXXX"
                          autoComplete="tel"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          defaultValue={user?.email || ""}
                          placeholder="you@gmail.com"
                          autoComplete="email"
                          className={fieldClass}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Delivery address */}
                  <fieldset className="space-y-4">
                    <legend className="mb-1 text-sm font-extrabold uppercase tracking-wide text-slate-400">
                      Delivery address
                    </legend>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="division" className={labelClass}>Division</label>
                        <select
                          id="division"
                          name="division"
                          required
                          defaultValue=""
                          className={fieldClass}
                        >
                          <option value="" disabled>Choose division</option>
                          {divisions.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="district" className={labelClass}>District</label>
                        <input
                          id="district"
                          name="district"
                          type="text"
                          required
                          placeholder="e.g. Natore"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="thana" className={labelClass}>Thana / Upazila</label>
                        <input
                          id="thana"
                          name="thana"
                          type="text"
                          required
                          placeholder="Thana or upazila"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="postCode" className={labelClass}>Post code</label>
                        <input
                          id="postCode"
                          name="postCode"
                          type="text"
                          inputMode="numeric"
                          required
                          pattern="\d{4}"
                          title="Post code must be 4 digits"
                          placeholder="e.g. 6400"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className={labelClass}>Exact location</label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        minLength={10}
                        rows={3}
                        placeholder="House no, road, village or area, nearby landmark"
                        className={`${fieldClass} resize-y`}
                      />
                    </div>
                  </fieldset>

                  {/* Payment and note */}
                  {/* <fieldset className="space-y-4">
                    <legend className="mb-1 text-sm font-extrabold uppercase tracking-wide text-slate-400">
                      Payment method
                    </legend>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {paymentMethods.map((m, i) => (
                        <label
                          key={m}
                          className="cursor-pointer rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-semibold text-slate-700 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700 dark:border-zinc-700 dark:text-slate-200 dark:has-[:checked]:bg-green-500/10 dark:has-[:checked]:text-green-300"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={m}
                            defaultChecked={i === 0}
                            className="sr-only"
                          />
                          {m}
                        </label>
                      ))}
                    </div>

                    <div>
                      <label htmlFor="note" className={labelClass}>
                        Note for delivery <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        rows={2}
                        placeholder="Anything we should know?"
                        className={`${fieldClass} resize-y`}
                      />
                    </div>
                  </fieldset> */}
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 dark:shadow-red-900/40"
                  >
                    <FiShoppingCart />
                    Confirm order · ৳{total.toLocaleString("en-US")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
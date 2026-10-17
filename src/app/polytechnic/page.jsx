"use client";

import React, { useEffect, useState } from "react";
import {
  FaBook,
  FaGraduationCap,
  FaShoppingCart,
  FaCheckCircle,
  FaTruck,
  FaPhoneAlt,
  FaUser,
  FaMapMarkerAlt,
  FaTimes,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// ---------- data (edit here, not in the JSX) ----------
const ORDER_PHONE = "01975665249"; // put your real number here
const BASE_PRICE_PER_SET = ""; // sample price per set, replace with real prices later
const MAX_QUANTITY = 10;

const departments = [
  "Computer Science & Technology (CST/CSE)",
  "Civil Technology",
  "Electrical Technology",
  "Mechanical Technology",
  "Electronics Technology",
  "Power Technology",
  "Architecture & Interior Design Technology",
  "Automobile Technology",
  "Refrigeration & Air-Conditioning (RAC)",
  "Textile Technology",
  "Chemical Technology",
  "Environmental Technology",
  "Electromedical Technology",
  "Telecommunication Technology",
  "Data Telecommunication & Networking",
  "Marine Technology",
  "Shipbuilding Technology",
  "Mechatronics Technology",
  "Construction Technology",
  "Food Technology",
  "Graphic Design & Printing Technology",
  "Glass & Ceramics Technology",
  "Surveying Technology",
  "Garments Design & Pattern Making",
  "Apparel Manufacturing Technology",
  "Instrumentation & Process Control Technology",
  "Mining & Mine Surveying Technology",
  "Diploma in Agriculture",
  "Diploma in Fisheries",
  "Diploma in Forestry",
  "Tourism & Hospitality Management",
];

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const publishers = [
  "Haq Publication",
  "Technical Publication",
  "Standard Publication",
];
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

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-green-900";
const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";

// Removes angle brackets, extra spaces and trims the text
const clean = (v = "") =>
  String(v).replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

// +8801712345678, 8801712345678 and 01712345678 all become 01712345678
const normalizePhone = (v = "") => {
  const digits = String(v).replace(/\D/g, "");
  return digits.startsWith("880") ? `0${digits.slice(3)}` : digits;
};

export default function PolyLeadersPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [publisher, setPublisher] = useState(publishers[0]);
  const [quantity, setQuantity] = useState(1);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const ready = Boolean(department && semester);
  const totalPrice = ready ? BASE_PRICE_PER_SET * quantity : 0;

  // Close the form with Escape and stop the page behind from scrolling
  useEffect(() => {
    if (!showOrderModal) return;
    const onKey = (e) => e.key === "Escape" && setShowOrderModal(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [showOrderModal]);

  // Only logged-in users can order, so every order is tied to a real account
  const openOrderForm = () => {
    if (!user) {
      toast.info("Please log in to place an order.");
      router.push("/login");
      return;
    }
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    

    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());

    // Honeypot: real people never see or fill this hidden field, bots do
    if (raw.website) return;
    const { data, error } = await authClient.token();
    console.log(data.token,"from the badfffffds")


    const division = clean(raw.division);
    const district = clean(raw.district);
    const thana = clean(raw.thana);
    const postCode = clean(raw.postCode);
    const address = clean(raw.address);

    const order = {
      // who is ordering (taken from the login session, not from the form)
      userId: user.id,
      email: user.email,
      name: clean(raw.name),
      phone: normalizePhone(raw.phone),

      // delivery
      division,
      district,
      thana,
      postCode,
      address,
      fullAddress: [address, thana, district, division, postCode]
        .filter(Boolean)
        .join(", "),

      // what they ordered
      department,
      semester,
      publisher,
      quantity,
      totalPrice, // the server must calculate the real total again, never trust this one

      createdAt: new Date().toISOString(),
    };

    console.log("Polytechnic book set order:", order);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}polytechnic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${data.token}`
        // Telling the server the data is in JSON format
      },
      body: JSON.stringify(order),
    });

    // Online ordering for sets is not connected to the backend yet
    toast.info(
      `Thank you, ${order.name}! Online ordering for book sets is not ready yet. Please call ${ORDER_PHONE} to place your order.`,
      { autoClose: 8000 },
    );

    setShowOrderModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-zinc-900 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mx-auto mb-10 max-w-4xl text-center">
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl text-green-600 dark:bg-green-500/20 dark:text-green-400">
          <FaGraduationCap />
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Polytechnic{" "}
          <span className="bg-gradient-to-r from-[#e7000b] to-green-500 bg-clip-text text-transparent">
            book set
          </span>{" "}
          order
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          Choose your department and semester to order a complete 1-set book
          package, delivered to your door.
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
          After Order A set of book our Tem will be Contact With you for next
          step thank you for join with us
        </p>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-8">
        {/* Selection form */}
        <section className="min-w-0 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
          <h2 className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4 text-lg font-extrabold text-slate-900 dark:border-zinc-800 dark:text-white">
            <FaBook className="text-green-600 dark:text-green-400" />
            Select book details
          </h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="department" className={labelClass}>
                Technology / Department
              </label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={fieldClass}
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="semester" className={labelClass}>
                  Semester
                </label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select semester</option>
                  {semesters.map((s) => (
                    <option key={s} value={s}>
                      {s} Semester
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="publisher" className={labelClass}>
                  Publisher
                </label>
                <select
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className={fieldClass}
                >
                  {publishers.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity stepper */}
            <div>
              <span className={labelClass}>Quantity (sets)</span>
              <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-zinc-800"
                >
                  <FaMinus />
                </button>
                <span className="w-10 text-center text-base font-extrabold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))
                  }
                  disabled={quantity >= MAX_QUANTITY}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-zinc-800"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Order summary */}
        <aside className="min-w-0 md:sticky md:top-24 md:self-start">
          <div className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
            <h3 className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4 text-lg font-extrabold text-slate-900 dark:border-zinc-800 dark:text-white">
              <FaShoppingCart className="text-green-600 dark:text-green-400" />
              Order summary
            </h3>

            <dl className="space-y-3 text-sm">
              {[
                ["Department", department || "Not selected"],
                [
                  "Semester",
                  semester ? `${semester} Semester` : "Not selected",
                ],
                ["Publisher", publisher],
                ["Quantity", `${quantity} set${quantity > 1 ? "s" : ""}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-dashed border-slate-200 pb-3 dark:border-zinc-800"
                >
                  <dt className="shrink-0 text-slate-500 dark:text-slate-400">
                    {label}
                  </dt>
                  <dd className="text-right font-semibold text-slate-900 dark:text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* <div className="mt-5 flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3 dark:bg-green-500/10">
              <span className="text-sm font-semibold text-green-800 dark:text-green-300">Estimated price</span>
              <span className="text-xl font-extrabold text-green-700 dark:text-green-300">
                ৳{"Alocona shapakhe"}
              </span>
            </div> */}

            <ul className="mt-5 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="shrink-0 text-green-500" /> Updated
                Regulation 2022 curriculum
              </li>
              <li className="flex items-center gap-2">
                <FaTruck className="shrink-0 text-green-500" /> Cash on delivery
                available
              </li>
            </ul>

            <button
              type="button"
              onClick={openOrderForm}
              disabled={!ready}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e7000b] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:shadow-red-900/40 dark:focus-visible:ring-offset-zinc-950 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
            >
              <FaShoppingCart />
              {user ? "Order now" : "Log in to order"}
            </button>
            {!ready && (
              <p className="mt-2 text-center text-xs text-slate-400 dark:text-slate-500">
                Choose a department and semester to continue.
              </p>
            )}

            <a
              href={`tel:${ORDER_PHONE}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-zinc-700 dark:text-slate-200 dark:hover:bg-zinc-800"
            >
              <FaPhoneAlt />
              Call to order
            </a>
          </div>
        </aside>
      </div>

      {/* Checkout modal: a bottom sheet on phones, a centered card on larger screens */}
      {showOrderModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setShowOrderModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="poly-order-title"
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:border dark:border-zinc-800 dark:bg-zinc-950 sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-zinc-800 sm:px-6">
              <h3
                id="poly-order-title"
                className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl"
              >
                Confirm your order
              </h3>
              <button
                type="button"
                onClick={() => setShowOrderModal(false)}
                aria-label="Close"
                className="rounded-full p-2 text-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleOrderSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-slate-300">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {department}
                  </p>
                  <p className="mt-1">
                    {semester} Semester · {publisher} · {quantity} set
                    {quantity > 1 ? "s" : ""}
                  </p>
                  <p className="mt-2 font-extrabold text-green-700 dark:text-green-300">
                    Total ৳{totalPrice.toLocaleString("en-US")}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className={`${labelClass} flex items-center gap-2`}
                  >
                    <FaUser className="text-green-600 dark:text-green-400" />{" "}
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={3}
                    defaultValue={user?.name || ""}
                    placeholder="Your full name"
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className={`${labelClass} flex items-center gap-2`}
                  >
                    <FaPhoneAlt className="text-green-600 dark:text-green-400" />{" "}
                    Phone / WhatsApp
                  </label>
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
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    readOnly
                    value={user?.email || ""}
                    className={`${fieldClass} cursor-not-allowed opacity-80`}
                  />
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Taken from your account, so an order cannot be sent under
                    someone else&apos;s email.
                  </p>
                </div>

                {/* Honeypot: hidden from people, bots fill it in */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Leave this empty
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="division" className={labelClass}>
                      Division
                    </label>
                    <select
                      id="division"
                      name="division"
                      required
                      defaultValue=""
                      className={fieldClass}
                    >
                      <option value="" disabled>
                        Choose division
                      </option>
                      {divisions.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="district" className={labelClass}>
                      District
                    </label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      required
                      placeholder="e.g. Rangpur"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="thana" className={labelClass}>
                      Thana / Upazila
                    </label>
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
                    <label htmlFor="postCode" className={labelClass}>
                      Post code
                    </label>
                    <input
                      id="postCode"
                      name="postCode"
                      type="text"
                      inputMode="numeric"
                      required
                      pattern="\d{4}"
                      title="Post code must be 4 digits"
                      placeholder="e.g. 5400"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className={`${labelClass} flex items-center gap-2`}
                  >
                    <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />{" "}
                    Exact location
                  </label>
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
              </div>

              <div className="flex gap-3 border-t border-slate-100 px-5 py-4 dark:border-zinc-800 sm:px-6">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="w-1/2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-zinc-700 dark:text-slate-200 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-[#e7000b] py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 dark:shadow-red-900/40"
                >
                  Confirm order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

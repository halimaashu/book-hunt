"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";

export default function DeleteBookButton({ id, title }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Could not delete the book.");
      }
      setOpen(false);
      router.refresh(); // reload the table
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${title}`}
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <FiTrash2 />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
              <FiAlertTriangle />
            </span>
            <h2 id="delete-title" className="mt-4 text-xl font-extrabold text-slate-900">
              Delete this book?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{title}</span> will be removed
              from the store. This cannot be undone.
            </p>

            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
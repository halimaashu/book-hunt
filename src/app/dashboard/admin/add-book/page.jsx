"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  FiUploadCloud,
  FiX,
  FiPlusCircle,
  FiRotateCcw,
  FiCheckCircle,
  FiAlertCircle,
  FiImage,
} from "react-icons/fi";

const categories = ["Story", "Tech", "Science", "History", "Fantasy", "Business","Polytechnic"];
const MAX_SIZE_MB = 5;

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200";

export default function AddBookPage() {
  const fileRef = useRef(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(""); // "uploading" | "saving"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ---------- image handling ----------
  const pickFile = (f) => {
    setError("");
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or WEBP).");
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image is too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const clearImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  // Uploads the picked image to imgbb and returns the hosted URL
  const uploadToImgbb = async () => {
    const body = new FormData();
    body.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      { method: "POST", body }
    );
    const json = await res.json();
    if (!json?.success) throw new Error("Image upload failed. Please try again.");
    return json.data.url;
  };

  // ---------- form handling ----------
  const resetAll = () => {
    setTitle("");
    setAuthor("");
    setCategory("");
    setQuantity("");
    setDescription("");
    clearImage();
    setError("");
    setSuccess(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!file) {
      setError("Please upload a book cover image.");
      return;
    }
    if (!category) {
      setError("Please choose a category.");
      return;
    }

    setLoading(true);
    try {
      setStep("uploading");
      const image_url = await uploadToImgbb();

      setStep("saving");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          category,
          description: description.trim(),
          available_quantity: Number(quantity),
          image_url,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Could not save the book. Please try again.");
      }

      resetAll();
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setStep("");
    }
  };

  const buttonText =
    step === "uploading" ? "Uploading image..." : step === "saving" ? "Saving book..." : "Add book";

  const qty = Number(quantity);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Add a new book
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload a cover, fill in the details and publish it to the store.
        </p>
      </div>

      {success && (
        <div
          role="status"
          className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700"
        >
          <FiCheckCircle className="shrink-0 text-xl" />
          <span className="font-semibold">Book added successfully!</span>
          <Link href="/allBooks" className="ml-auto font-semibold underline">
            View all books
          </Link>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
        >
          <FiAlertCircle className="mt-0.5 shrink-0 text-xl" />
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:gap-8">
        {/* Form */}
        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <Form className="flex flex-col gap-5" onSubmit={onSubmit} onReset={resetAll}>
            {/* Image upload */}
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-slate-700">
                Book cover
              </span>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                id="cover"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />

              {preview ? (
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Selected cover"
                    className="h-24 w-20 rounded-lg object-cover shadow"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{file?.name}</p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearImage}
                    aria-label="Remove image"
                    className="rounded-full bg-white p-2 text-lg text-slate-500 shadow transition hover:bg-red-50 hover:text-red-600"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="cover"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    pickFile(e.dataTransfer.files?.[0]);
                  }}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-10 text-center transition ${
                    dragging
                      ? "border-green-500 bg-green-50"
                      : "border-slate-300 bg-slate-50 hover:border-green-400 hover:bg-green-50/50"
                  }`}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-green-600 shadow">
                    <FiUploadCloud />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-slate-800">
                    Click to choose or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    JPG, PNG or WEBP, up to {MAX_SIZE_MB} MB
                  </p>
                </label>
              )}
            </div>

            {/* Title */}
            <TextField
              isRequired
              name="title"
              value={title}
              onChange={setTitle}
              validate={(v) => (v.trim().length < 3 ? "Title must be at least 3 characters" : null)}
            >
              <Label>Title</Label>
              <Input placeholder="e.g. AI Revolution" />
              <FieldError />
            </TextField>

            {/* Author */}
            <TextField
              isRequired
              name="author"
              value={author}
              onChange={setAuthor}
              validate={(v) => (v.trim().length < 3 ? "Author name must be at least 3 characters" : null)}
            >
              <Label>Author</Label>
              <Input placeholder="e.g. Olivia Johnson" />
              <FieldError />
            </TextField>

            {/* Category + quantity */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <TextField
                isRequired
                name="available_quantity"
                type="number"
                value={quantity}
                onChange={setQuantity}
                validate={(v) =>
                  v === "" || !Number.isInteger(Number(v)) || Number(v) < 0
                    ? "Enter a whole number, 0 or more"
                    : null
                }
              >
                <Label>Available quantity</Label>
                <Input placeholder="e.g. 14" min={0} />
                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                minLength={20}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short summary of the book (at least 20 characters)"
                className={`${fieldClass} resize-y`}
              />
              <p className="mt-1 text-xs text-slate-400">{description.length} characters</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="reset"
                variant="secondary"
                isDisabled={loading}
                className="rounded-xl px-6 py-3 text-sm font-semibold"
              >
                <FiRotateCcw />
                Reset
              </Button>
              <Button
                type="submit"
                isDisabled={loading}
                className="rounded-xl bg-[#e7000b] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 hover:bg-red-700"
              >
                {loading ? buttonText : (
                  <>
                    <FiPlusCircle />
                    Add book
                  </>
                )}
              </Button>
            </div>
          </Form>
        </section>

        {/* Live preview */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-sm font-semibold text-slate-500">Live preview</p>
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg">
            <div className="relative aspect-[4/5] w-full bg-slate-100">
              {preview ? (
                <Image src={preview} alt="Cover preview" fill unoptimized className="object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                  <FiImage className="text-5xl" />
                  <span className="text-sm">Cover preview</span>
                </div>
              )}

              {category && (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                  {category}
                </span>
              )}
              {quantity !== "" && !Number.isNaN(qty) && (
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${
                    qty === 0
                      ? "bg-red-100 text-red-700"
                      : qty <= 5
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {qty === 0 ? "Out of stock" : qty <= 5 ? `Only ${qty} left` : `${qty} in stock`}
                </span>
              )}
            </div>

            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                {title || "Book title"}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{author ? `by ${author}` : "Author name"}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {description || "The description will appear here as you type."}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
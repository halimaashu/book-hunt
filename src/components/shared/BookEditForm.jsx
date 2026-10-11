'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, TextField, TextArea, Label, Input, FieldError } from '@heroui/react';

const CATEGORIES = ['Story', 'Tech', 'Science', 'History', 'Fantasy', 'Business', 'Polytechnic'];

// Your Express API base, e.g. http://localhost:5000
const API = process.env.NEXT_PUBLIC_API_URL;

const BookEditForm = ({ book }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(book.image_url || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const payload = {
      title: data.title.trim(),
      author: data.author.trim(),
      category: data.category,
      description: data.description.trim(),
      image_url: data.image_url.trim(),
      available_quantity: Number(data.available_quantity),
      // price is optional: empty -> null, so the book shows as "no price"
      price: data.price === '' ? null : Number(data.price),
    };

    try {
      setSaving(true);
      const res = await fetch(`${API}/books/${book._id}`, {
        method: 'PUT', // change to PATCH if your Express route uses PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Update failed');

      setMessage({ type: 'success', text: 'Book updated successfully.' });
      router.refresh();
    } catch (err) {
      setMessage({ type: 'error', text: 'Could not update the book. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => {
    setImageUrl(book.image_url || '');
    setMessage(null);
  };

  const selectClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200';

  return (
    <Form onSubmit={onSubmit} onReset={onReset} className="grid gap-6 md:grid-cols-[1fr_260px]">
      {/* Left: fields */}
      <div className="flex flex-col gap-4">
        <TextField name="title" isRequired defaultValue={book.title}>
          <Label>Title</Label>
          <Input placeholder="Book title" />
          <FieldError />
        </TextField>

        <TextField name="author" isRequired defaultValue={book.author}>
          <Label>Author</Label>
          <Input placeholder="Author name" />
          <FieldError />
        </TextField>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={book.category}
            className={selectClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="price" type="number" defaultValue={book.price ?? ''}>
            <Label>Price (optional)</Label>
            <Input placeholder="Leave empty if no price" min="0" />
            <FieldError />
          </TextField>

          <TextField
            name="available_quantity"
            type="number"
            isRequired
            defaultValue={String(book.available_quantity ?? 0)}
          >
            <Label>Available quantity</Label>
            <Input min="0" />
            <FieldError />
          </TextField>
        </div>

        <TextField name="description" defaultValue={book.description}>
          <Label>Description</Label>
          <TextArea rows={5} placeholder="Short description of the book" />
        </TextField>

        <TextField
          name="image_url"
          type="url"
          isRequired
          value={imageUrl}
          onChange={setImageUrl}
        >
          <Label>Image URL</Label>
          <Input placeholder="https://..." />
          <FieldError />
        </TextField>

        {message && (
          <p
            role="status"
            className={`rounded-lg border p-3 text-sm ${
              message.type === 'success'
                ? 'border-green-300 bg-green-50 text-green-700'
                : 'border-red-300 bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex gap-3">
          <Button type="submit" isDisabled={saving} className="bg-green-600 text-white">
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
          <Button type="reset" variant="outline" className="border-red-500 text-red-600">
            Reset
          </Button>
        </div>
      </div>

      {/* Right: live cover preview */}
      <aside className="flex flex-col gap-2">
        <span className="text-sm font-medium">Cover preview</span>
        <div className="aspect-[3/4] overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="Book cover preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-red-500">
              No image
            </div>
          )}
        </div>
      </aside>
    </Form>
  );
};

export default BookEditForm;
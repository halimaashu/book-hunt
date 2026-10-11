// app/admin/books/[editBook]/page.jsx  (adjust path to your route)
import BookEditForm from '@/components/shared/BookEditForm';
import { getBook } from '@/lib/data';


const BookEditPage = async ({ params }) => {
  const { editBook } = await params;
  const book = await getBook(editBook);

  if (!book) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          Book not found. It may have been deleted.
        </p>
      </div>
    );
  }

  // Only plain, serializable data can go to a client component
  const plainBook = JSON.parse(JSON.stringify(book));

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="mb-1 text-2xl font-bold text-green-700">Edit book</h1>
      <p className="mb-6 text-sm text-gray-500">
        Update the details for &ldquo;{plainBook.title}&rdquo;.
      </p>
      <BookEditForm book={plainBook} />
    </div>
  );
};

export default BookEditPage;
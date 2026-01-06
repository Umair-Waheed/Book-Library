import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
export default function Books({url}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${url}/books`);
        setBooks(res.data.books); // backend returns { books: [] }
      } catch (error) {
        console.error("Error fetching books", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading books...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Available Books
      </h1>

      {books.length === 0 ? (
        <p className="text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map(book => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="border rounded-lg p-5 shadow-sm hover:shadow-lg transition bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {book.title}
              </h2>

              <p className="text-gray-600">
                <span className="font-medium">Author:</span> {book.author}
              </p>

              <p className="text-gray-600">
                <span className="font-medium">Genre:</span> {book.genre}
              </p>

              <p className="mt-4 text-blue-600 font-medium">
                View Details →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

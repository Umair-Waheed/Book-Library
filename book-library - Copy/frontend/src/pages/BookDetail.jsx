import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../services/api"; 

export default function BookDetail({ url }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`${url}/books/${id}`);
        console.log(res.data.book);
        setBook(res.data.book);
      } catch (error) {
        console.error("Error fetching book", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading book details...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-10 text-gray-500">Book not found</div>
    );
  }

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const storedUser = localStorage.getItem("user");
  console.log(storedUser)
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  console.log(currentUser)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Books
      </Link>

      <div className="bg-white border rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <p>
            <span className="font-semibold">Genre:</span> {book.genre}
          </p>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {book.description || "No description provided."}
          </p>
        </div>

        <div className="mt-4">
          <p>
            <span className="font-semibold">Created At:</span> {formatDate(book.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span> {formatDate(book.updatedAt)}
          </p>
        </div>

        {currentUser && book.ownerId?._id === currentUser && (
          <div className="mt-6 flex space-x-3">
            <Link
              to={`/edit-book/${book._id}`}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={async () => {
                if (window.confirm("Are you sure to delete this book?")) {
                  await api.delete(`/books/${book._id}`);
                  navigate("/"); 
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

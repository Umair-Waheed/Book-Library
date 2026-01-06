import { useNavigate,Link } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // immediately update state
    alert("Logout Successfull!")
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Book Library
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Books</Link>
          {user && <Link to="/create-book" className="text-gray-700 hover:text-blue-600 font-medium">+ Add Book</Link>}
        </div>

        <div className="space-x-3">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Register</Link>
            </>
          ) : (
            <>
              <span className="px-4 py-2 text-gray-700 font-medium">{user.name}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

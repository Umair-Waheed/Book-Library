import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import BookForm from "./pages/BookForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  const url = "http://localhost:4000";
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  
  return (
    <>
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Books url={url}/>} />
        <Route path="/books/:id" element={<BookDetail url={url}/>} />
        <Route path="/create-book" element={<BookForm />} />
  <Route path="/edit-book/:id" element={<BookForm />} />
        <Route path="/login" element={<Login setUser={setUser} url={url}/>} />
        <Route path="/register" element={<Register url={url}/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
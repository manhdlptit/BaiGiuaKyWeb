import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { PostDetail } from "./pages/PostDetail";
import { WritePost } from "./pages/WritePost";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("is_logged_in") === "true";
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("is_logged_in", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("is_logged_in");
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route
          path="/write"
          element={
            isLoggedIn ? <WritePost /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

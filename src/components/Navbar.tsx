import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        padding: "1rem",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            marginRight: "20px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Homepage
        </Link>
        {isLoggedIn && (
          <Link
            to="/write"
            style={{ marginRight: "20px", textDecoration: "none" }}
          >
            New post
          </Link>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={() => {
              onLogout();
              navigate("/");
            }}
            style={{
              padding: "6px 12px",
              background: "#ff4d4f",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              padding: "6px 12px",
              background: "#1890ff",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

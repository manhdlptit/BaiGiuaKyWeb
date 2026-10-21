import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404</h1>
      <p>Wrong</p>
      <Link
        to="/"
        style={{ color: "#red", textDecoration: "none", fontWeight: "bold" }}
      >
        return homepage
      </Link>
    </div>
  );
};

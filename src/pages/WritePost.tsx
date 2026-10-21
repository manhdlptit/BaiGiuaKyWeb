import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types";

export const WritePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setErrorMsg("Not null any value");
      return;
    }

    const newPost: Post = {
      id: "local_" + Date.now(),
      title,
      body,
    };

    const existingPostsString = localStorage.getItem("local_posts");
    const existingPosts: Post[] = existingPostsString
      ? JSON.parse(existingPostsString)
      : [];

    localStorage.setItem(
      "local_posts",
      JSON.stringify([newPost, ...existingPosts]),
    );

    alert("Upload post successfully");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>
      <h2>New post</h2>
      {errorMsg && (
        <div style={{ color: "red", marginBottom: "15px" }}>{errorMsg}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Header
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #454444",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Content
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #535252",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          post
        </button>
      </form>
    </div>
  );
};

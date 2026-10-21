import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types";

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Error when download data");
        const apiPosts: Post[] = await res.json();

        const localPostsString = localStorage.getItem("local_posts");
        const localPosts: Post[] = localPostsString
          ? JSON.parse(localPostsString)
          : [];

        setPosts([...localPosts, ...apiPosts]);
      } catch (err: unknown) {
        setError((err as Error).message || "Error when up new post");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading</div>;
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Error: {error}
      </div>
    );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
      <h2>List post</h2>
      <input
        type="text"
        placeholder="Search for post"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #fff",
        }}
      />
      {filteredPosts.length === 0 ? (
        <p>None</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid fff",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "6px",
              background: "#fff",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>
              <Link
                to={`/posts/${post.id}`}
                style={{ textDecoration: "none", color: "#blue" }}
              >
                {post.title}
              </Link>
            </h3>
            <p style={{ margin: 0, color: "#5c5c5c" }}>
              {post.body.substring(0, 100)}...
            </p>
          </div>
        ))
      )}
    </div>
  );
};

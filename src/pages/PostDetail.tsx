import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Comment, Post } from "../types";

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        const localPostsString = localStorage.getItem("local_posts");
        const localPosts: Post[] = localPostsString
          ? JSON.parse(localPostsString)
          : [];
        const foundLocal = localPosts.find((p) => String(p.id) === id);

        if (foundLocal) {
          setPost(foundLocal);
          setComments([]);
        } else {
          const [postRes, commentRes] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`),
          ]);

          if (!postRes.ok) throw new Error("None");

          const postData = await postRes.json();
          const commentData = await commentRes.json();

          setPost(postData);
          setComments(commentData);
        }
      } catch (err: unknown) {
        setError((err as Error).message || "Error when up post");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailData();
  }, [id]);

  if (loading)
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading</div>;
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Error: {error}
      </div>
    );
  if (!post)
    return <div style={{ textAlign: "center", padding: "20px" }}>Error</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#blue" }}>
        &larr; Return
      </Link>
      <h1 style={{ marginTop: "15px" }}>{post.title}</h1>
      <p style={{ lineHeight: "1.6", fontSize: "16px", color: "#555555" }}>
        {post.body}
      </p>

      <hr style={{ margin: "30px 0" }} />
      <h3>Comment ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>Not comment</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              background: "#fff",
              padding: "10px 15px",
              borderRadius: "4px",
              marginBottom: "10px",
              border: "1px solid #413e3e",
            }}
          >
            <strong>{comment.name}</strong>{" "}
            <span style={{ color: "#363535", fontSize: "12px" }}>
              ({comment.email})
            </span>
            <p style={{ margin: "5px 0 0 0" }}>{comment.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

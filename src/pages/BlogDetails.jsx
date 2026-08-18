import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getBlogById } from "../services/blogApi";
import { useBlogs } from "../context/BlogContext";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { removeBlog } = useBlogs();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBlogById(id);

        setBlog(data);
      } catch (err) {
        setError("Unable to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await removeBlog(Number(id));

      navigate("/");
    } catch (err) {
      setError("Unable to delete blog.");
    }
  };

  if (loading) {
    return (
      <section className="page-section">
        <h1>Loading Blog...</h1>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section">
        <h1>{error}</h1>

        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="page-section">
        <h1>Blog Not Found</h1>

        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>
      </section>
    );
  }

  const imageUrl = `https://dummyjson.com/image/1000x500?text=${encodeURIComponent(
    blog.title
  )}`;

  return (
    <section className="details-page">
      <div className="details-container">

        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>

        <article className="blog-details">

          <img
            src={imageUrl}
            alt={blog.title}
            className="details-image"
          />

          <div className="details-content">

            <div className="blog-tags">
              {blog.tags?.map((tag) => (
                <span key={tag} className="blog-category">
                  #{tag}
                </span>
              ))}
            </div>

            <h1>{blog.title}</h1>

            <div className="blog-meta">
              <span>User ID: {blog.userId}</span>
              <span>Views: {blog.views || 0}</span>
              <span>
                👍 {blog.reactions?.likes || 0}
              </span>
            </div>

            <p className="details-body">
              {blog.body}
            </p>

            <div className="details-actions">

              <Link
                to={`/edit/${blog.id}`}
                className="edit-btn"
              >
                Edit Blog
              </Link>

              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Blog
              </button>

            </div>

          </div>

        </article>
      </div>
    </section>
  );
}

export default BlogDetails;
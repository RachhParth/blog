import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BlogForm from "../components/BlogForm";
import { getBlogById } from "../services/blogApi";
import { useBlogs } from "../context/BlogContext";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { editBlog } = useBlogs();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBlogById(id);

        setBlog({
          title: data.title || "",
          author: data.userId ? `User ${data.userId}` : "",
          category: data.tags?.[0] || "",
          content: data.body || "",
          image: `https://dummyjson.com/image/800x450?text=${encodeURIComponent(
            data.title || "Blog"
          )}`,
        });
      } catch (err) {
        setError("Unable to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdateBlog = async (formData) => {
    try {
      await editBlog(Number(id), formData);

      navigate(`/blog/${id}`);
    } catch (err) {
      setError("Unable to update blog.");
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

  return (
    <section className="create-page">
      <div className="form-container">

        <div className="page-heading">
          <h1>Edit Blog</h1>
          <p>Update your blog information.</p>
        </div>

        <BlogForm
          initialData={blog}
          onSubmit={handleUpdateBlog}
        />

      </div>
    </section>
  );
}

export default EditBlog;
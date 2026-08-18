import { useState } from "react";
import BlogForm from "../components/BlogForm";

function BlogForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    category: initialData?.category || "",
    image: initialData?.image || "",
    content: initialData?.content || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.category.trim() ||
      !formData.content.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");
    onSubmit(formData);
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="form-group">
        <label htmlFor="title">
          Blog Title *
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
        />
      </div>

      {/* Author */}
      <div className="form-group">
        <label htmlFor="author">
          Author *
        </label>

        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />
      </div>

      {/* Category */}
      <div className="form-group">
        <label htmlFor="category">
          Category *
        </label>

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">
            Select category
          </option>

          <option value="Technology">
            Technology
          </option>

          <option value="Lifestyle">
            Lifestyle
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Business">
            Business
          </option>
        </select>
      </div>

      {/* Image */}
      <div className="form-group">
        <label htmlFor="image">
          Image URL
        </label>

        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <small>
          Optional: Add an image URL for your blog.
        </small>
      </div>

      {/* Image Preview */}
      {formData.image && (
        <div className="image-preview">
          <p>Image Preview</p>

          <img
            src={formData.image}
            alt="Blog preview"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="form-group">
        <label htmlFor="content">
          Blog Content *
        </label>

        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog content..."
          rows="10"
        />
      </div>

      <button
        type="submit"
        className="submit-btn"
      >
        {initialData ? "Update Blog" : "Create Blog"}
      </button>

    </form>
  );
}

export default BlogForm;
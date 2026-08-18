import { useNavigate } from "react-router-dom";

import BlogForm from "../components/BlogForm";
import { useBlogs } from "../context/BlogContext";

function CreateBlog() {
  const { addBlog } = useBlogs();
  const navigate = useNavigate();

  const handleCreateBlog = (formData) => {
    addBlog(formData);
    navigate("/");
  };

  return (
    <section className="create-page">
      <div className="form-container">
        <div className="page-heading">
          <h1>Create New Blog</h1>
          <p>Share your thoughts and ideas with the world.</p>
        </div>

        <BlogForm onSubmit={handleCreateBlog} />
      </div>
    </section>
  );
}

export default CreateBlog;
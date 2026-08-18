import { createContext, useContext, useEffect, useState } from "react";

import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/blogApi";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // READ
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getBlogs();

        setBlogs(data);
      } catch (err) {
        setError("Unable to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // CREATE
  const addBlog = async (blogData) => {
    const newBlog = await createBlog(blogData);

    const blogWithExtraData = {
      ...newBlog,
      author: blogData.author,
      category: blogData.category,
      image: blogData.image,
      content: blogData.content,
    };

    setBlogs((prevBlogs) => [
      blogWithExtraData,
      ...prevBlogs,
    ]);

    return blogWithExtraData;
  };

  // UPDATE
  const editBlog = async (id, blogData) => {
    const updatedBlog = await updateBlog(id, blogData);

    const updatedBlogData = {
      ...updatedBlog,
      author: blogData.author,
      category: blogData.category,
      image: blogData.image,
      content: blogData.content,
    };

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              ...updatedBlogData,
            }
          : blog
      )
    );

    return updatedBlogData;
  };

  // DELETE
  const removeBlog = async (id) => {
    await deleteBlog(id);

    setBlogs((prevBlogs) =>
      prevBlogs.filter((blog) => blog.id !== id)
    );
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        addBlog,
        editBlog,
        removeBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  return useContext(BlogContext);
}
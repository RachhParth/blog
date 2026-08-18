const API_URL = "https://dummyjson.com/posts";

// GET all blogs
export const getBlogs = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return data.posts;
};

// GET single blog
export const getBlogById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }

  return await response.json();
};

// CREATE
export const createBlog = async (blog) => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: blog.title,
      body: blog.content,
      userId: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return await response.json();
};

// UPDATE
export const updateBlog = async (id, blog) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: blog.title,
      body: blog.content,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  return await response.json();
};

// DELETE
export const deleteBlog = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  return await response.json();
};
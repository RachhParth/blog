import { useState } from "react";
import { Link } from "react-router-dom";

import { useBlogs } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";

function Home() {
  const { blogs, loading, error } = useBlogs();
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    return (
      blog.title?.toLowerCase().includes(searchText) ||
      blog.body?.toLowerCase().includes(searchText) ||
      blog.tags?.some((tag) =>
        tag.toLowerCase().includes(searchText)
      )
    );
  });

  if (loading) {
    return (
      <section className="loading-section">
        <div className="loader"></div>
        <h2>Loading Blogs...</h2>
        <p>Fetching latest stories...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="error-section">
        <div className="error-box">
          <h2>Something went wrong!</h2>
          <p>{error}</p>

          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <main>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">

          <div className="hero-content">
            <span className="hero-badge">
              ✨ Welcome to BlogPro
            </span>

            <h1>
              Ideas That
              <span> Inspire.</span>
              <br />
              Stories That
              <span> Matter.</span>
            </h1>

            <p>
              Discover interesting stories, useful ideas and
              experiences shared by people around the world.
            </p>

            <div className="hero-buttons">
              <a href="#blogs" className="hero-primary">
                Explore Blogs →
              </a>

              <Link to="/create" className="hero-secondary">
                Write a Blog
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-icon">✍️</div>

              <h3>Share Your Story</h3>

              <p>
                Your ideas can inspire someone.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">

          <div className="stat-box">
            <strong>{blogs.length}+</strong>
            <span>Blogs</span>
          </div>

          <div className="stat-box">
            <strong>100%</strong>
            <span>Responsive</span>
          </div>

          <div className="stat-box">
            <strong>24/7</strong>
            <span>Access</span>
          </div>

          <div className="stat-box">
            <strong>CRUD</strong>
            <span>Enabled</span>
          </div>

        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="blogs-section" id="blogs">
        <div className="blogs-container">

          <div className="section-heading">
            <div>
              <span>OUR BLOGS</span>
              <h2>Latest Stories</h2>
              <p>
                Explore our latest posts and discover something new.
              </p>
            </div>

            <Link to="/create" className="create-btn">
              + Create Blog
            </Link>
          </div>

          {/* SEARCH */}
          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="result-info">
            Showing <strong>{filteredBlogs.length}</strong> blogs
          </div>

          {/* BLOGS */}
          {filteredBlogs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>

              <h2>No blogs found</h2>

              <p>
                Try searching with another keyword.
              </p>

              {search && (
                <button
                  className="empty-btn"
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="blog-grid">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                />
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Home;
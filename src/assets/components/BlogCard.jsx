import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  const imageUrl = `https://picsum.photos/seed/blog-${blog.id}/800/450`;

  return (
    <article className="blog-card">
      <div className="blog-image-wrapper">
        <img
          src={imageUrl}
          alt={blog.title}
          className="blog-image"
        />
      </div>

      <div className="blog-card-content">
        <div className="blog-tags">
          {blog.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="blog-category">
              #{tag}
            </span>
          ))}
        </div>

        <h2>{blog.title}</h2>

        <p>
          {blog.body?.length > 120
            ? `${blog.body.substring(0, 120)}...`
            : blog.body}
        </p>

        <div className="blog-card-footer">
          <span>👁 {blog.views || 0} views</span>

          <Link to={`/blog/${blog.id}`}>
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
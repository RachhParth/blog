import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>Blog</span>Pro
          </Link>

          <p>
            A simple and modern blogging platform where
            ideas become stories and stories inspire people.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/create">Create Blog</Link>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>Resources</h3>

          <a href="#blogs">Latest Blogs</a>
          <a href="#blogs">Popular Posts</a>
          <a href="#blogs">Categories</a>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>

          <p>📧 support@blogpro.com</p>
          <p>📍 India</p>
          <p>🌐 www.blogpro.com</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">

          <p>
            © {currentYear} BlogPro. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
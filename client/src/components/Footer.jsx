import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-center section-theme border-top py-4">
      <div className="container">
        <p className="mb-1">&copy; 2025 <span className="text-warning">Education360</span>. All rights reserved.</p>
        <p className="mb-0">
          <a href="#" className="text-muted text-decoration-none me-2">Privacy Policy</a> |
          <a href="#" className="text-muted text-decoration-none ms-2">Terms of Use</a>
        </p>
        <div className="mt-2">
          <a href="#" className="text-muted me-3"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-muted me-3"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-muted me-3"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="text-muted"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

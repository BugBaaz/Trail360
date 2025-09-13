import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <div className="container text-center">
            <h1>Welcome to Education360</h1>
            <p>Read Anytime, Anywhere – Digital Learning Made Easy</p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
              <a href="/books" className="btn btn-warning btn-lg px-4 py-2 fw-bold shadow-sm">Explore Library</a>
              <a href="/login" className="btn btn-outline-light btn-lg px-4 py-2 fw-bold shadow-sm">Register Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <i className="fas fa-book-open"></i>
              <h5 className="mt-2">Thousands of Books</h5>
            </div>
            <div className="col-md-3">
              <i className="fas fa-download"></i>
              <h5 className="mt-2">Easy Download</h5>
            </div>
            <div className="col-md-3">
              <i className="fas fa-user-shield"></i>
              <h5 className="mt-2">Secure Access</h5>
            </div>
            <div className="col-md-3">
              <i className="fas fa-mobile-alt"></i>
              <h5 className="mt-2">Mobile Friendly</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Books */}
      <section className="py-5 section-trending-books" id="trending-books">
        <div className="container">
          <h2 className="text-center mb-4"><i className="bi bi-fire text-warning"></i> Trending Books</h2>
          <div className="row">
            {["Atomic Habits","Deep Work","The Subtle Art..."].map((title, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card trending-card h-100 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794" className="card-img-top" alt="Book"/>
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">By Author</p>
                    <a href="#" className="btn btn-warning text-dark">Read Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author of the Month */}
      <div className="section-separator my-5"></div>
      <section className="py-5 section-author-month" id="author-of-month">
        <div className="container text-center">
          <h2 className="mb-4"><i className="bi bi-person-circle text-warning"></i> Author of the Month</h2>
          <div className="row align-items-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <img src="https://images.unsplash.com/photo-1603415526960-f7e0328d4f89" className="img-fluid rounded-circle shadow" alt="Author" style={{width:"200px", height:"200px", objectFit:"cover"}}/>
            </div>
            <div className="col-md-8 text-start">
              <h4 className="text-warning">Dr. Maya Bennett</h4>
              <p className="mb-3">Author of <em>"Mindful Learning"</em> and a pioneer in neuroscience-based education.</p>
              <blockquote className="blockquote"><p className="mb-0 fst-italic">"Education is not about filling a bucket, but lighting a fire."</p></blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinar */}
      <div className="section-separator my-5"></div>
      <section className="py-5 section-upcoming-webinar" id="upcoming-webinar">
        <div className="container">
          <h2 className="text-center mb-5"><i className="fas fa-video text-warning"></i> Upcoming Webinar</h2>
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img src="https://img.freepik.com/free-vector/webinar-concept-illustration_114360-4764.jpg" className="img-fluid rounded shadow" alt="Webinar"/>
            </div>
            <div className="col-md-6 text-start">
              <h4 className="text-warning">"Digital Learning Strategies for 2025"</h4>
              <p>Join us for a live session with top educators and digital experts.</p>
              <ul>
                <li><strong>Date:</strong> August 10, 2025</li>
                <li><strong>Time:</strong> 6:00 PM IST</li>
                <li><strong>Speaker:</strong> Prof. Arvind Malhotra</li>
              </ul>
              <a href="#" className="btn btn-warning fw-semibold mt-3">Register Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <div className="section-separator my-5"></div>
      <section className="py-5 section-theme" id="testimonials">
        <div className="container text-center">
          <h2 className="mb-5"><i className="fas fa-quote-left text-warning"></i> What Our Users Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {["Riya Sharma","Ankur Jain","Priya Mehta"].map((user, idx) => (
                <div className={`carousel-item ${idx===0?"active":""}`} key={idx}>
                  <blockquote className="blockquote">
                    <p className="mb-4 fst-italic">"Testimonial by {user}"</p>
                    <footer className="blockquote-footer text-warning">{user}</footer>
                  </blockquote>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-warning rounded-circle" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-warning rounded-circle" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="section-separator my-5"></div>
      <section className="py-5 bg-custom-dark text-light" id="contact">
        <div className="container">
          <h2 className="text-center text-warning mb-4"><i className="fas fa-envelope"></i> Contact Us</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control input-theme" id="name" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Your Email</label>
                  <input type="email" className="form-control input-theme" id="email" placeholder="Enter your email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control input-theme" id="message" rows="4" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="btn btn-warning fw-bold px-4">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

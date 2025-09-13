import React, { useState } from "react";
import "../styles/LoginPage.css"; // your CSS file

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      name: form.name?.value,
      email: form.email.value,
      password: form.password.value
    };

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (res.ok) {
        setMessage(isLogin ? "Login successful!" : "Registration successful! Please login.");
        if (!isLogin) toggleForm();
        form.reset();
      } else {
        setMessage(result.message || "Something went wrong!");
      }
    } catch (err) {
      setMessage("Server error! Try again.");
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <div className="main">
        {/* Left Side */}
        <div className="left-side">
          <div className="content">
            <h1>Welcome to Education360</h1>
            <p>Access thousands of books online, anytime, anywhere.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-side">
          <div className="form-box">
            <h3>
              <i className={`fas ${isLogin ? "fa-sign-in-alt" : "fa-user-plus"}`}></i>{" "}
              {isLogin ? "Login" : "Register"}
            </h3>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label>Full Name</label>
                  <input
                    name="name"
                    className="form-control"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`btn w-100 ${isLogin ? "btn-warning" : "btn-success"}`}
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            {message && (
              <div
                className={`alert text-center mt-3 ${
                  isLogin ? "alert-warning" : "alert-success"
                }`}
              >
                {message}
              </div>
            )}

            <p className="text-center mt-3">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="toggle-link" onClick={toggleForm}>
                {isLogin ? "Register here" : "Login here"}
              </span>
            </p>

            <p className="text-center mt-3">
              <i
                className={`fas ${darkMode ? "fa-sun" : "fa-moon"} theme-toggle`}
                onClick={toggleTheme}
              ></i>{" "}
              Toggle Theme
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

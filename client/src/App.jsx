import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
// future pages
// import Books from "./pages/Books";
// import About from "./pages/About";
// import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="books" element={<Books />} /> */}
          {/* <Route path="about" element={<About />} /> */}
          <Route path="/login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

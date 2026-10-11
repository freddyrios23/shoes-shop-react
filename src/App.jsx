import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/organims/Navbar";
import Footer from "./components/organims/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminMode from "./pages/AdminMode";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminMode" element={<AdminMode />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

// Componentes principales de la aplicación
import NavBar from "./components/organims/Navbar";
import Footer from "./components/organims/Footer";

// Páginas
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SuccessPay from "./pages/SuccessPay";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adminmode from "./pages/AdminMode";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pago-exitoso" element={<SuccessPay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Adminmode" element={<Adminmode />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
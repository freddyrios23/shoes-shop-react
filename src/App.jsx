
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/organims/Navbar";
import Footer from "./components/organims/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SuccessPay from "./pages/SuccessPay";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Adminmode from "./pages/AdminMode";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";

// Importamos los productos locales como respaldo
import productosIniciales from "./data/products";

// Importamos la función que consulta Spring Boot
import { obtenerZapatillas } from "./services/zapatillasService";

function App() {

    // Estado que almacena los productos
    const [productos, setProductos] = useState(productosIniciales);

    // Estado para controlar la carga
    const [cargando, setCargando] = useState(true);

    // Estado para guardar posibles errores
    const [errorApi, setErrorApi] = useState("");

    // Se ejecuta cuando se inicia la aplicación
    useEffect(() => {

        const cargarProductos = async () => {

            try {
                // Solicitamos las zapatillas al backend
                const respuesta = await obtenerZapatillas();

                // Spring HATEOAS entrega los elementos dentro de _embedded
                const lista = respuesta?._embedded?.zapatillaDTOList || [];

                // Adaptamos los datos del backend al formato del frontend
                const productosAPI = lista.map((elemento) => {

                    const producto = elemento;

                    // Buscamos la imagen local correspondiente
                    const productoLocal = productosIniciales.find(
                        (p) => p.id === producto.id
                    );

                    return {
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        imagen: producto.imagen || productoLocal?.imagen || "/img/Adidas.jpg"
                    };
                });

                // Actualizamos los productos con los datos de la API
                setProductos(productosAPI);

            } catch (error) {

                console.error("Error al cargar productos:", error);

                // Conservamos los productos locales si falla el backend
                setErrorApi("No se pudo conectar con el servidor. Mostrando productos de respaldo.");

            } finally {

                // Finalizamos el estado de carga
                setCargando(false);
            }
        };

        cargarProductos();

    }, []);

    return (
        <>
            <NavBar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route
                    path="/products"
                    element={
                        <Products
                            productos={productos}
                            cargando={cargando}
                            errorApi={errorApi}
                        />
                    }
                />

                <Route path="/products/:id" element={<ProductDetail productos={productos} />}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pago-exitoso" element={<SuccessPay />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/Adminmode"
                    element={
                        <Adminmode
                            productos={productos}
                            setProductos={setProductos}
                        />
                    }
                />

                <Route path="/Contact" element={<Contact />} />
                <Route path="/About" element={<About />} />
                <Route path="/admin-login" element={<AdminLogin />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;

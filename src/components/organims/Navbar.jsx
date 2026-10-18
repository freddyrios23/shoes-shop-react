import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);

    // Vanilla JS para cerrar el menú al hacer clic fuera
    useEffect(() => {
        function manejarClickFuera(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setMenuAbierto(false);
            }
        }

        document.addEventListener("mousedown", manejarClickFuera);
        return () => {
            document.removeEventListener("mousedown", manejarClickFuera);
        };
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
            <Container>
                {/* Logo / Marca */}
                <Navbar.Brand as={Link} to="/">
                    SHOES SHOP
                </Navbar.Brand>

                {/* Íconos a la derecha: Monito (Usuario) y Carrito */}
                <div className="d-flex align-items-center order-lg-last gap-3 ms-auto ms-lg-3">
                    {/* Monito / Usuario con menú desplegable */}
                    <div className="nav-user-container" ref={dropdownRef}>
                        <button
                            type="button"
                            className="nav-icon-btn"
                            onClick={() => setMenuAbierto((prev) => !prev)}
                            aria-label="Cuenta de usuario"
                            aria-expanded={menuAbierto}
                        >
                            {/* Ícono de usuario (Monito) */}
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>

                        {/* Menú desplegable con Iniciar sesión y Registrarse */}
                        {menuAbierto && (
                            <div className="nav-user-dropdown">
                                <Link
                                    to="/login"
                                    className="nav-dropdown-item"
                                    onClick={() => setMenuAbierto(false)}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    <span>Iniciar sesión</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="nav-dropdown-item"
                                    onClick={() => setMenuAbierto(false)}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                    <span>Registrarse</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Carrito de compras */}
                    <Link
                        to="/cart"
                        className="nav-icon-btn"
                        aria-label="Carrito de compras"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </Link>
                </div>

                {/* Botón hamburguesa en pantallas pequeñas */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Enlaces principales */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

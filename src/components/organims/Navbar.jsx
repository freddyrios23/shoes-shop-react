import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Verificamos si hay un usuario activo guardado
    const usuarioActivo = localStorage.getItem('usuarioActivo');

    // Cerrar sesión
    const cerrarSesion = () => {
        localStorage.removeItem('usuarioActivo');
        setMenuAbierto(false);
        alert('Has cerrado sesión correctamente.');
        navigate('/login');
    };

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
                <Navbar.Brand as={Link} to={window.location.pathname === "/" ? "/Adminmode" : "/"}>
                    SHOES SHOP
                </Navbar.Brand>

                <div className="d-flex align-items-center order-lg-last gap-3 ms-auto ms-lg-3">
                    <div className="nav-user-container" ref={dropdownRef}>
                        <button
                            type="button"
                            className="nav-icon-btn"
                            onClick={() => setMenuAbierto((prev) => !prev)}
                            aria-label="Cuenta de usuario"
                            aria-expanded={menuAbierto}
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
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>

                        {menuAbierto && (
                            <div className="nav-user-dropdown">
                                {usuarioActivo ? (
                                    /* Opción para Salir si inició sesión */
                                    <button
                                        type="button"
                                        className="nav-dropdown-item border-0 bg-transparent w-100 text-start"
                                        onClick={cerrarSesion}
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
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        <span>Salir</span>
                                    </button>
                                ) : (
                                    /* Opciones si NO ha iniciado sesión */
                                    <>
                                        <Link
                                            to="/login"
                                            className="nav-dropdown-item"
                                            onClick={() => setMenuAbierto(false)}
                                        >
                                            <span>Iniciar sesión</span>
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="nav-dropdown-item"
                                            onClick={() => setMenuAbierto(false)}
                                        >
                                            <span>Registrarse</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <Link to="/cart" className="nav-icon-btn" aria-label="Carrito de compras">
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

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

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
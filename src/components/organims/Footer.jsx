import React from "react";
import { Link } from "react-router-dom";
import Text from "../atoms/Text";

function Footer() {
    return (
        <footer className="footer">

            {/* Nombre de la tienda */}
            <Text variant="h1">SHOES SHOP</Text>

            {/* Enlaces del footer */}
            <Text variant="p">
                <Link to="/Contact" className="footer-link">
                    Contacto
                </Link>
                {" * "}
                <Link to="/About" className="footer-link">
                    Sobre Nosotros
                </Link>
                {" * "}
                <a href="https://www.instagram.com/elarayax" className="footer-link">
                    Redes Sociales
                </a>
            </Text>
            {/* Derechos de autor */}
            <Text variant="p">
                © 2026 Shoes Shop. Todos los derechos reservados.
            </Text>
        </footer>
    );
}

export default Footer;
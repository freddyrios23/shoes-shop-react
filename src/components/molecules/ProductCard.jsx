import { Card } from "react-bootstrap";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import CardBody from "./CardBody";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    // Permite navegar a la página de detalles
    const navigate = useNavigate();

    return (
        <Card className="m-2 h-100">
            {/* Imagen del zapato */}
            <Image
                src={product.image}
                alt={product.name}
                className="card-img-top"
            />

            <Card.Body>
                {/* Nombre, descripción y precio */}
                <CardBody
                    title={product.name}
                    description={product.description}
                    price={product.price}
                />

                {/* Botón para ver los detalles */}
                <Button
                    variant="primary"
                    onClick={() => navigate(`/products/${product.id}`)}
                >
                    Ver detalles
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
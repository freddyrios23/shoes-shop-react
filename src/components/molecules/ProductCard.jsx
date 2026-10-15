import { Card } from "react-bootstrap";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import CardBody from "./CardBody";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    // Permite navegar a la página de detalles
    const navigate = useNavigate();

    // Función para agregar al carrito
    const agregarAlCarrito = () => {
        const datosGuardados = localStorage.getItem('carrito');
        let listaActual = [];

        if (datosGuardados) {
            listaActual = JSON.parse(datosGuardados);
        }

        // Buscamos si el producto ya existe en el carrito
        let existe = false;
        for (let i = 0; i < listaActual.length; i++) {
            if (listaActual[i].id === product.id) {
                let cant = listaActual[i].cantidad;
                if (!cant) {
                    cant = 1;
                }
                listaActual[i].cantidad = cant + 1;
                existe = true;
                break;
            }
        }

        // Si no existe, lo agregamos como nuevo con cantidad 1
        if (!existe) {
            const productoAAgregar = {
                id: product.id,
                nombre: product.name,
                precio: product.price,
                imagen: product.image,
                cantidad: 1
            };
            listaActual.push(productoAAgregar);
        }

        localStorage.setItem('carrito', JSON.stringify(listaActual));
        alert('¡Producto agregado al carrito!');
    };

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

                <div className="d-flex gap-2 mt-3">
                    {/* Botón para ver los detalles */}
                    <Button
                        variant="primary"
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        Ver detalles
                    </Button>

                    {/* Botón para agregar al carrito */}
                    <Button
                        variant="success"
                        onClick={agregarAlCarrito}
                    >
                        Añadir
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
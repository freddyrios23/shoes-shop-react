import Text from "../atoms/Text";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

function ProductDetailContent({ producto }) {
    const navigate = useNavigate();

    // Función para agregar al carrito
    const agregarAlCarrito = () => {
        const datosGuardados = localStorage.getItem("carrito");
        let listaActual = [];

        if (datosGuardados) {
            listaActual = JSON.parse(datosGuardados);
        }

        // Buscamos si el producto ya existe en el carrito
        let existe = false;
        for (let i = 0; i < listaActual.length; i++) {
            if (listaActual[i].id === producto.id) {
                let cant = listaActual[i].cantidad;
                if (!cant) {
                    cant = 1;
                }
                listaActual[i].cantidad = cant + 1;
                existe = true;
                break;
            }
        }

        // Si no existe, lo agregamos con cantidad 1
        if (!existe) {
            const nuevoProducto = {
                ...producto,
                cantidad: 1
            };
            listaActual.push(nuevoProducto);
        }

        localStorage.setItem("carrito", JSON.stringify(listaActual));
        alert("¡Producto agregado al carrito!");
    };

    return (
        <div className="container my-5">
            <div className="row align-items-center">

                {/* Imagen del producto */}
                <div className="col-md-6">
                    <Image
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid"
                    />
                </div>

                {/* Información del producto */}
                <div className="col-md-6">
                    <Text variant="h1">
                        {producto.nombre}
                    </Text>

                    <Text variant="h3" className="text-primary">
                        ${producto.precio.toLocaleString("es-CL")}
                    </Text>

                    <Text variant="p">
                        {producto.descripcion || "Zapatillas disponibles en Shoes Shop."}
                    </Text>

                    <div className="d-flex gap-2 mt-3">
                        <Button
                            variant="success"
                            onClick={agregarAlCarrito}
                        >
                            Añadir al carrito
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => navigate("/products")}
                        >
                            Volver a productos
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetailContent;
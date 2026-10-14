
import Text from "../atoms/Text";
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

function ProductDetailContent({ producto }) {
    const navigate = useNavigate();

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

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/products")}
                    >
                        Volver a productos
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default ProductDetailContent;

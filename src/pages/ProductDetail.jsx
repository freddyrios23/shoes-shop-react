
import { useParams } from "react-router-dom";
import productos from "../data/products";
import ProductDetailContent from "../components/organims/ProductDetailContent";
import Text from "../components/atoms/Text";

function ProductDetail() {
    // Obtenemos el ID desde la URL
    const { id } = useParams();

    // Buscamos el producto según su ID
    const producto = productos.find(
        (item) => String(item.id) === id
    );

    // Si no existe el producto
    if (!producto) {
        return (
            <div className="container my-5">
                <Text variant="h2">
                    Producto no encontrado
                </Text>
            </div>
        );
    }

    // Mostramos el organismo con la información del producto
    return <ProductDetailContent producto={producto} />;
}

export default ProductDetail;

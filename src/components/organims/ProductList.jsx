// Importamos el arreglo que contiene los productos originales de la tienda
import productosOriginales from "../../data/products";

 // Importamos la tarjeta que muestra la información de cada zapatilla
import ProductCard from "../molecules/ProductCard";

// Recibimos los productos, el texto de búsqueda y el límite
function ProductList({ productos = productosOriginales, busqueda = "", limite }) {

    // Filtramos los productos según su nombre
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Si se indica un límite, lo aplicamos; si no, mostramos todos
    const productosMostrados = limite
        ? productosFiltrados.slice(0, limite)
        : productosFiltrados;

    return (
        <div className="container my-4">
            <div className="row g-4">

                {/* Recorremos los productos que vamos a mostrar */}
                {productosMostrados.map((producto) => (
                    <div
                        className="col-12 col-sm-6 col-lg-4"
                        key={producto.id}
                    >
                        <ProductCard
                            product={{
                                id: producto.id,
                                name: producto.nombre,
                                price: producto.precio,
                                image: producto.imagen,
                                description: producto.descripcion || ""
                            }}
                        />
                    </div>
                ))}

            </div>

            {/* Mostramos este mensaje si la búsqueda no encontró resultados */}
            {productosFiltrados.length === 0 && (
                <p className="text-center">
                    No se encontraron productos.
                </p>
            )}
        </div>
    );
}

export default ProductList;

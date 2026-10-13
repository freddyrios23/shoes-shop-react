import productos from "../../data/products";
import ProductCard from "../molecules/ProductCard";

function ProductList({ busqueda = "" }) {
    // Filtramos los productos por nombre
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container my-4">
            <div className="row g-4">
                {productosFiltrados.map((producto) => (
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

            {/* Mensaje cuando no hay coincidencias */}
            {productosFiltrados.length === 0 && (
                <p className="text-center">
                    No se encontraron productos.
                </p>
            )}
        </div>
    );
}

export default ProductList;
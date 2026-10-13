
// Importamos la lista de productos
import ProductList from "../components/organims/ProductList";

function Products() {
    return (
        <div className="container mt-4">
            <h1>Productos</h1>

            {/* Mostramos la lista de productos */}
            <ProductList />
        </div>
    );
}

export default Products;


import React, { useState } from "react";
import SearchBar from "../components/molecules/SearchBar";
import ProductList from "../components/organims/ProductList";

function Products({ productos }) {
    // Guardamos el texto que se enviará al listado de productos
    const [busqueda, setBusqueda] = useState("");

    return (
        <div className="container mt-4">
            <h1 className="text-center">Productos</h1>

            {/* Mostramos la barra de búsqueda */}
            <SearchBar onSearch={setBusqueda} />

            {/* Filtramos los productos según la búsqueda */}
            <ProductList
                productos={productos}
                busqueda={busqueda}
            />
        </div>
    );
}

export default Products;


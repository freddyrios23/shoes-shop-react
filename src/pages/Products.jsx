
import React, { useState } from "react";
import SearchBar from "../components/molecules/SearchBar";
import ProductList from "../components/organims/ProductList";
import Text from "../components/atoms/Text";

function Products({ productos , cargando, errorApi}) {
    // Guardamos el texto que se enviará al listado de productos
    const [busqueda, setBusqueda] = useState("");

    return (
        <div className="container mt-4">
            <h1 className="text-center">Productos</h1>
            {cargando && <Text variant="p">Cargando productos...</Text>}
            {errorApi && (
                <div className="alert alert-warning">
                    {errorApi}
                </div>
            )}
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


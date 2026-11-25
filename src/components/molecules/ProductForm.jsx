
import React from "react";

import { Input } from "../atoms/Input";
import Button from "../atoms/Button";
import MarcaSelect from "./MarcaSelect";

function ProductForm({
    nombre,
    setNombre,
    precio,
    setPrecio,
    imagen,
    setImagen,
    marcas,
    marcaId,
    setMarcaId,
    onSubmit
}) {
    return (
        <div className="mb-4">

            {/* Campo nombre */}
            <Input
                className="form-control mb-2"
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            {/* Campo precio */}
            <Input
                className="form-control mb-3"
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />

            {/* Campo imagen */}
            <Input
                className="form-control mb-3"
                type="text"
                placeholder="URL de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
            />

            {/* Selector de marcas */}
            <MarcaSelect
                marcas={marcas}
                value={marcaId}
                onChange={(e) => setMarcaId(e.target.value)}
            />

            {/* Botón para agregar */}
            <Button
                className="mt-1"
                variant="success"
                onClick={onSubmit}
            >
                Agregar producto
            </Button>

        </div>
    );
}

export default ProductForm;

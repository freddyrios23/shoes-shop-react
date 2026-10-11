import React, { useState } from "react";
import { Input } from "../atoms/Input";
import Button from "../atoms/Button";

function SearchBar() {
    const [busqueda, setBusqueda] = useState("");

    return (

        <div>

            <Input
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}

            />

            <Button onClick={buscar}>
                Buscar
            </Button>
        </div>


    );
}

export default SearchBar;

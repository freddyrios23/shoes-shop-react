import React, { useState } from "react";
import { Input } from "../atoms/Input";
import Button from "../atoms/Button";

// onSearch es una función que recibiremos desde otro componente
function SearchBar({ onSearch }) {

    // Guardamos el texto que escribe el usuario en el buscador.
    // busqueda contiene el texto actual y setBusqueda permite modificarlo.
    const [busqueda, setBusqueda] = useState("");

    // Esta función se ejecuta cuando el usuario pulsa el botón Buscar
    const buscar = () => {

        // Comprobamos que el componente padre haya enviado una función
        if (onSearch) {

            // Enviamos el texto escrito al componente padre
            onSearch(busqueda);
        }
    };

    // Esta función permite buscar al presionar la tecla Enter
    const handleKeyDown = (e) => {

        // Comprobamos si la tecla presionada fue Enter
        if (e.key === "Enter") {

            // Ejecutamos la función de búsqueda
            buscar();
        }
    };

    // Mostramos el buscador en pantalla
    return (
        // Usamos clases de Bootstrap para organizar los elementos
        <div className="d-flex gap-2 my-3">

            {/* Campo donde el usuario escribe el nombre del producto */}
            <Input
                placeholder="Buscar productos..."

                // El valor del campo corresponde al estado busqueda
                value={busqueda}

                // Actualizamos el estado cada vez que el usuario escribe
                onChange={(e) => setBusqueda(e.target.value)}

                // Detectamos cuando el usuario presiona una tecla
                onKeyDown={handleKeyDown}
            />

            {/* Botón que ejecuta la búsqueda al hacer clic */}
            <Button onClick={buscar}>
                Buscar
            </Button>

        </div>
    );
}

// Exportamos el componente para utilizarlo en otras partes del proyecto
export default SearchBar;
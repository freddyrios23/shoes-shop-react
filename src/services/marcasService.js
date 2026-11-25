
import api from "./api";

// Obtener todas las marcas
export const obtenerMarcas = async () => {
    const response = await api.get("/api/v1/marcas");
    return response.data;
};

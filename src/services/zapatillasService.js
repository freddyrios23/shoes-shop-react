
import api from "./api";

// Obtener todas las zapatillas
export const obtenerZapatillas = async () => {
    const response = await api.get("/api/v1/zapatillas");
    return response.data;
};

// Obtener una zapatilla por su ID
export const obtenerZapatillaPorId = async (id) => {
    const response = await api.get(`/api/v1/zapatillas/${id}`);
    return response.data;
};

// Registrar una zapatilla
export const registrarZapatilla = async (zapatilla) => {
    const response = await api.post("/api/v1/zapatillas", zapatilla);
    return response.data;
};

// Actualizar una zapatilla
export const actualizarZapatilla = async (id, zapatilla) => {
    const response = await api.patch(`/api/v1/zapatillas/${id}`, zapatilla);
    return response.data;
};

// Eliminar una zapatilla
export const eliminarZapatilla = async (id) => {
    const response = await api.delete(`/api/v1/zapatillas/${id}`);
    return response.data;
};
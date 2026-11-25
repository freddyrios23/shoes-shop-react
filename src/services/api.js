
import axios from "axios";

// Configuración principal para comunicarnos con el backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});

export default api;

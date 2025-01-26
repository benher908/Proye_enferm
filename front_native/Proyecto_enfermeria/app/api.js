import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.31:8000", // Reemplaza con tu dirección correcta
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
// src/helpers/queries.js

// 1. Definimos la URL BASE maestra (Si no hay .env, usa localhost:3001/api)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// 2. Derivamos las rutas específicas
const URL_PRODUCTOS = `${API_URL}/productos`;
const URL_USUARIOS = `${API_URL}/usuarios`;
const URL_PAGOS = `${API_URL}/pagos`;

// --- PRODUCTOS ---

export const leerProductos = async () => {
  try {
    const respuesta = await fetch(URL_PRODUCTOS);
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error("Error leyendo productos:", error);
    return [];
  }
};

export const crearProducto = async (producto, token) => {
  try {
    const respuesta = await fetch(URL_PRODUCTOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.error("Error creando producto:", error);
    return false;
  }
};

export const borrarProducto = async (id, token) => {
  try {
    const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error("Error borrando producto:", error);
    return false;
  }
};

export const editarProducto = async (id, producto, token) => {
  try {
    const respuesta = await fetch(`${URL_PRODUCTOS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.error("Error editando producto:", error);
    return false;
  }
};

// --- PAGOS (Mercado Pago) ---

export const generarPagoMP = async (carrito, envioInfo, token) => {
  try {
    // Usamos la constante URL_PAGOS definida arriba para mantener consistencia
    const respuesta = await fetch(`${URL_PAGOS}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify({ productos: carrito, envio: envioInfo }),
    });
    const data = await respuesta.json();
    return data.id; // Retorna el preferenceId
  } catch (error) {
    console.log(error);
    return null;
  }
};
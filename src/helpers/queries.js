// src/helpers/queries.js

// Definimos las URLs base (esto viene de tus variables de entorno o hardcodeado por ahora)
const URL_PRODUCTOS = import.meta.env.VITE_API_PRODUCTOS || "http://localhost:4000/api/productos";
const URL_USUARIOS = import.meta.env.VITE_API_USUARIOS || "http://localhost:4000/api/usuarios";
// Si tuvieras autenticación:
// const URL_AUTH = "http://localhost:4000/api/auth";

// --- PRODUCTOS ---

export const leerProductos = async () => {
  try {
    const respuesta = await fetch(URL_PRODUCTOS);
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error("Error leyendo productos:", error);
    return []; // Retornamos array vacío para que no rompa el .map
  }
};

export const crearProducto = async (producto, token) => {
  try {
    const respuesta = await fetch(URL_PRODUCTOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": token // Token para seguridad
      },
      body: JSON.stringify(producto)
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
        "x-token": token
      }
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
        "x-token": token
      },
      body: JSON.stringify(producto)
    });
    return respuesta;
  } catch (error) {
    console.error("Error editando producto:", error);
    return false;
  }
};

// --- USUARIOS (Login/Registro) ---
// Aquí podrías agregar login, registro, listarUsuarios, etc.

// En src/helpers/queries.js (Frontend)
export const generarPagoMP = async (carrito, envioInfo, token) => {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/pagos/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-token": token
            },
            body: JSON.stringify({ productos: carrito, envio: envioInfo })
        });
        const data = await respuesta.json();
        return data.id; // Retorna el preferenceId
    } catch (error) {
        console.log(error);
        return null;
    }
};
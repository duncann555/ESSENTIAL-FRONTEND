import { createContext, useState, useEffect, useContext } from "react";

// 1. Creamos el contexto
const CarritoContext = createContext();

// 2. Creamos el proveedor
export const CarritoProvider = ({ children }) => {
  // Inicializamos el carrito leyendo el localStorage
  // Si hay algo guardado, lo cargamos. Si no, arranca vacío [].
  const [carrito, setCarrito] = useState(() => {
    const datosGuardados = localStorage.getItem("carrito_esenzia");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  // Cada vez que modificamos el carrito, actualizamos el localStorage
  useEffect(() => {
    localStorage.setItem("carrito_esenzia", JSON.stringify(carrito));
  }, [carrito]);

  // Función: Agregar producto
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      // Buscamos si el producto ya está en el carrito
      const itemExistente = prevCarrito.find((item) => item.id === producto.id);

      if (itemExistente) {
        // Si existe, le sumamos 1 a la cantidad
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función: Eliminar producto (por ID)
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Función: Vaciar todo
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Calculamos la cantidad total de items para el globito del menú
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Retornamos el proveedor con todas las funciones y datos
  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// 3. Hook para usar el contexto fácil
export const useCarrito = () => useContext(CarritoContext);
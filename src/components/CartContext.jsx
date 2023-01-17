import { useState, createContext, useEffect } from "react";

// Crear contexto:
export const CartContext = createContext();

const CartContextProvider = (props) => {
  // Estado local:
  const [cartList, setCartList] = useState(
    JSON.parse(localStorage.getItem("cartList")) || []
  );

  // UseEffect para localStorage de cartList:
  useEffect(() => {
    // Poner en LS:
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  // Funcion para agregar productos:
  const addToCart = (item) => {
    // Buscar si ya existe el producto en cartList:
    const findItem = cartList.find(
      (element) => Number(item.id) === Number(element.id)
    );

    if (findItem) {
      // Obtener el indice del item repetido:
      const indice = cartList.findIndex((elemento) => elemento.id === item.id);

      // Guardar la cantidad anterior:
      const cantidadAnterior = cartList[indice].cantidad;

      // Calcular la cantidad actual:
      item.cantidad += cantidadAnterior;

      // Eliminar item repetido:
      cartList.splice(indice, 1);
    }
    // Actualizar cartList:
    setCartList([...cartList, item]);
  };

  // Funcion para eliminar un producto:
  const deleteItem = (id) => {
    const nuevoArreglo = cartList.filter((element) => element.id !== id);
    setCartList(nuevoArreglo);
  };

  // Funcion para limpiar carrito:
  const removeList = () => {
    setCartList([]);
  };

  // Funcion para obtener la cantidad de productos:
  const calcItemsQty = () => {
    return cartList.reduce((acc, item) => acc + item.cantidad, 0);
  };

  // Funcion para obtener el total por producto:
  const calcItemSubTotal = (cantidad, precio) => {
    return cantidad * precio;
  };

  // Funcion para obtener el total de todos los productos:
  const calcItemTotal = () => {
    const total = cartList.reduce(
      (acc, item) => acc + item.cantidad * item.price,
      0
    );
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        deleteItem,
        removeList,
        calcItemsQty,
        calcItemSubTotal,
        calcItemTotal,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

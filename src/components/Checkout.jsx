import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import Formulario from "./Formulario";
import { showOrder } from "../utilities/sweetAlertMsj";
import {
  regExpName,
  regExpEmail,
  regExpAddress,
  regExpPhone,
} from "../utilities/expresion";

import {
  serverTimestamp,
  doc,
  setDoc,
  collection,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../utilities/firebaseConfig";

const Checkout = ({ greeting }) => {
  // Navigate para hacer Scroll al inicio:
  const navigate = useNavigate();

  // Obtener contexto:
  const test = useContext(CartContext);
  const { cartList, removeList, calcItemTotal } = test;

  // States para campos de formulario:
  const [state, setState] = useState({
    name: "",
    lastName: "",
    phone: "",
    mail: "",
    address: "",
    pay: "credit",
    stateName: "",
    stateNameMsj: "",
    stateLastName: "",
    stateLastNameMsj: "",
    statePhone: "",
    statePhoneMsj: "",
    stateMail: "",
    stateMailMsj: "",
    stateAddress: "",
    stateAddressMsj: "",
  });

  // Funciones para validar campos de formulario:
  const validateName = (name) => {
    if (name === "") {
      setState((prevState) => ({
        ...prevState,
        stateName: false,
        stateNameMsj: "Campo vacio",
      }));
      return;
    }
    if (!regExpName.test(name)) {
      setState((prevState) => ({
        ...prevState,
        stateName: false,
        stateNameMsj: "Nombre no valido",
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      stateName: true,
      stateNameMsj: "",
    }));
  };

  const validateLastName = (lastName) => {
    if (lastName === "") {
      setState((prevState) => ({
        ...prevState,
        stateLastName: false,
        stateLastNameMsj: "Campo vacio",
      }));
      return;
    }
    if (!regExpName.test(lastName)) {
      setState((prevState) => ({
        ...prevState,
        stateLastName: false,
        stateLastNameMsj: "Apellido no valido",
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      stateLastName: true,
      stateLastNameMsj: "",
    }));
  };

  const validateAddress = (address) => {
    if (address === "") {
      setState((prevState) => ({
        ...prevState,
        stateAddress: false,
        stateAddressMsj: "Campo vacio",
      }));
      return;
    }
    if (!regExpAddress.test(address)) {
      setState((prevState) => ({
        ...prevState,
        stateAddress: false,
        stateAddressMsj: "Direccion no valida",
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      stateAddress: true,
      stateAddressMsj: "",
    }));
  };

  const validateMail = (mail) => {
    if (mail === "") {
      setState((prevState) => ({
        ...prevState,
        stateMail: false,
        stateMailMsj: "Campo vacio",
      }));
      return;
    }
    if (!regExpEmail.test(mail)) {
      setState((prevState) => ({
        ...prevState,
        stateMail: false,
        stateMailMsj: "Email no valido",
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      stateMail: true,
      stateMailMsj: "",
    }));
  };

  const validatePhone = (phone) => {
    if (phone === "") {
      setState((prevState) => ({
        ...prevState,
        statePhone: false,
        statePhoneMsj: "Campo vacio",
      }));
      return;
    }
    if (!regExpPhone.test(phone)) {
      setState((prevState) => ({
        ...prevState,
        statePhone: false,
        statePhoneMsj: "Telefono no valido",
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      statePhone: true,
      statePhoneMsj: "",
    }));
  };

  // Funciones para cambio en campo del formulario:
  const handleChangeName = (e) => {
    const name = e.target.value;
    setState((prevState) => ({ ...prevState, name }));
    validateName(name);
  };

  const handleChangeLastName = (e) => {
    const lastName = e.target.value;
    setState((prevState) => ({ ...prevState, lastName }));
    validateLastName(lastName);
  };

  const handleChangeMail = (e) => {
    const mail = e.target.value;
    setState((prevState) => ({ ...prevState, mail }));
    validateMail(mail);
  };

  const handleChangePhone = (e) => {
    const phone = e.target.value;
    setState((prevState) => ({ ...prevState, phone }));
    validatePhone(phone);
  };

  const handleChangeAddress = (e) => {
    const address = e.target.value;
    setState((prevState) => ({ ...prevState, address }));
    validateAddress(address);
  };

  const handleChangePay = (e) => {
    const pay = e.target.value;
    setState((prevState) => ({ ...prevState, pay }));
  };

  // Funcion para submit:
  const handleSubmit = (e) => {
    // Detener submit
    e.preventDefault();

    let order = createUserOrder();
    addOrder(order);
  };

  // Funcion para crear un usuario con su orden de compra:
  const createUserOrder = () => {
    let order = {
      buyer: {
        name: state.name,
        lastName: state.lastName,
        email: state.mail,
        phone: state.phone,
        address: state.address,
        payment: state.pay,
      },
      total: calcItemTotal(), // calcular el importe total de la orden.
      items: cartList.map((element) => ({
        id: Number(element.id),
        price: element.price,
        title: element.title,
        qty: element.cantidad,
      })), // mapear carrito para agregar solo los datos solicitados de cada producto.
      date: serverTimestamp(), // método de firebase para asignar la fecha y hora del servidor.
    };
    return order;
  };

  // Funcion para agregar una orden nueva a firebase:
  const addOrder = (order) => {
    const firestoreAddOrder = async () => {
      // Crear la coleccion orders con ID automatico:
      const newOrderRef = doc(collection(db, "orders"));

      // Agregar order:
      await setDoc(newOrderRef, order);
      return newOrderRef;
    };
    // Ejecutar firestoreAddOrder:
    firestoreAddOrder()
      .then((response) => {
        // Mostrar datos de la orden creada:
        showOrder(
          "Order created!",
          response.id,
          order.buyer.name,
          order.buyer.lastName,
          order.total
        );

        // Actualizar stock:
        cartList.forEach(async (element) => {
          const itemRef = doc(db, "productos", element.id);
          await updateDoc(itemRef, {
            stock: increment(-element.cantidad),
          });
        });
        // Limpiar carrito:
        removeList();
        // Ir al inicio de pantalla:
        window.scrollTo(0, 0);
        // Volver a cart:
        navigate("/cart");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container pt-5">
      <div className="row text-center pt-2">
        <div className="col-lg-6 m-auto">
          <h1 className="font-size-md light-300">{greeting}</h1>
          <h4 className="light-300">Order Details</h4>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-2 pb-3">
        <div className="d-flex align-items-center">
          <Link to={"/cart"} className="text-decoration-none text-dark">
            <i className="fa fa-long-arrow-left"></i>
            <span className="ms-1">Back to cart</span>
          </Link>
        </div>
      </div>
      <Formulario
        handleChangeName={handleChangeName}
        handleChangeMail={handleChangeMail}
        handleChangeLastName={handleChangeLastName}
        handleChangeAddress={handleChangeAddress}
        handleChangePhone={handleChangePhone}
        handleChangePay={handleChangePay}
        handleSubmit={handleSubmit}
        state={state}
      />
    </div>
  );
};

export default Checkout;

import Swal from "sweetalert2";
import { formatNumber } from "./formatNumber";

const msjAlert = (icono, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: false,
  });
  Toast.fire({
    icon: icono,
    title: title,
  });
};

const showOrder = (msj, orderNumber, name, lastName, total) => {
  Swal.fire({
    icon: "success",
    title: msj,
    html: `User: ${name} ${lastName} <br>Order ID: ${orderNumber} <br>Total: $${formatNumber(
      total
    )}`,

    buttonsStyling: false,
    customClass: {
      confirmButton: "py-2 px-3 btn btn-dark btn-transition",
    },
  });
};

const submitError = (msj) => {
  Swal.fire({
    icon: "error",
    title: msj,
    text: `Order ID:`,
    buttonsStyling: false,
    customClass: {
      confirmButton: "py-2 px-3 btn btn-dark btn-transition",
    },
  });
};

export { msjAlert, showOrder, submitError };

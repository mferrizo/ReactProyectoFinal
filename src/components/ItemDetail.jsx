import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { msjAlert } from "../utilities/sweetAlertMsj";
import { formatNumber } from "../utilities/formatNumber";

const ItemDetail = ({ producto }) => {
  // State para cantidad de productos seleccionados:
  const [cantProductos, setCantProductos] = useState(0);
  const { addToCart } = useContext(CartContext);

  // Destructuring de producto:
  const {
    brand,
    title,
    price,
    promo,
    pictureUrl,
    description,
    screenSize,
    processor,
    ram,
    space,
    so,
    so_version,
    stock,
  } = producto;

  // Funcion para agregar productos:
  const onAdd = (cantidad) => {
    cantidad > 0
      ? msjAlert("success", `Productos seleccionados: ${cantidad}`)
      : msjAlert("error", "No disponible");
    setCantProductos(cantidad);
    addToCart({ ...producto, cantidad: cantidad });
  };

  return (
    <div className="col-md-8 col-xl-10 py-5">
      <div className="card border-0">
        <div className="row">
          <div className="col-xl-6">
            <div className="p-1">
              <img src={pictureUrl} className="card-img-top" alt={brand} />
            </div>
          </div>
          <div className="col-xl-6 bg-color-grey ">
            <div className="product p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Link to={"/"} className="text-decoration-none text-dark">
                    <i className="fa fa-long-arrow-left"></i>
                    <span className="ms-1">Back to shop</span>
                  </Link>
                </div>
                <div>
                  <i className="fa fa-heart text-muted m-1"></i>
                  <i className="fa fa-share-alt text-muted m-1"></i>
                </div>
              </div>
              <div className="mt-4 ">
                <h6 className="card-title text-uppercase mt-2">{title}</h6>
                <div className="d-flex flex-row align-items-center ">
                  <span className="text-danger bold-600 ">
                    ${formatNumber(price)}
                  </span>
                  <div className="ms-2 mb-1">
                    <span className="badge bg-primary rounded-pill">
                      {promo}% OFF
                    </span>
                  </div>
                </div>
              </div>
              <div className="list-details border-line-bottom pt-2 pb-2 font-size-m ">
                <div className="mx-1">
                  <i className="fa-solid fa-display me-1"></i>
                  <span>{screenSize}''</span>
                </div>
                <div className="mx-1 details">
                  <i className="fa-solid fa-microchip me-1"></i>
                  <span>{processor}</span>
                </div>
                <div className="mx-1">
                  <i className="fa-solid fa-memory me-1"></i>
                  <span>{ram}</span>
                </div>
                <div className="mx-1">
                  <i className="fa-solid fa-database me-1"></i>
                  <span>{space}</span>
                </div>
                <div className="mx-1">
                  <i className={`fa-brands fa-${so} me-1`}></i>
                  <span>{so_version}</span>
                </div>
              </div>
              <p className="pt-3 font-size-sm">{description}</p>
              <div className="d-flex align-items-center justify-content-start font-weight-bold mt-2">
                <span>Stock:</span>
                <span className="bg-dark mx-2 p-2 text-light">{stock}</span>
              </div>
              {cantProductos === 0 ? (
                <ItemCount stock={stock} initial={0} onAdd={onAdd} />
              ) : (
                <Link
                  to={"/cart"}
                  className="btn btn-danger btn-transition text-uppercase mr-2 px-4 me-3 mt-2 bold-500 border-radius-0"
                >
                  Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

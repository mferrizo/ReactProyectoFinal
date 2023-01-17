import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import { formatNumber } from "../utilities/formatNumber";
import { subString } from "../utilities/subString";

const Form = ({
  state,
  handleChangeName,
  handleChangeLastName,
  handleChangeAddress,
  handleChangeMail,
  handleChangePhone,
  handleChangePay,
  handleSubmit,
}) => {
  // Obtener contexto:
  const test = useContext(CartContext);
  const {
    calcItemsQty,
    cartList,
    /*  deleteItem,
    removeList,
    calcItemSubTotal, */
    calcItemTotal,
  } = test;

  return (
    <section className="">
      <div className="checkout-cart-content px-4 pb-4 pt-0 mb-4">
        <div className="row g-5 ">
          <div className="col-md-6 col-lg-5 order-md-last bg-color-grey-1 border-line-top pb-4 ">
            <h4 className="d-flex justify-content-between align-items-center pt-4 mb-3 ">
              <Link to="/cart" className="text-decoration-none">
                <span className="text-danger">Your Order</span>
              </Link>
              <Link to="/cart">
                <span className="badge bg-danger rounded-pill">
                  {calcItemsQty()}
                </span>
              </Link>
            </h4>
            <ul className="list-group  mb-3 ">
              {cartList.map((element) => (
                <li
                  className="list-group-item d-flex justify-content-between lh-sm"
                  key={element.id}
                >
                  <div>
                    <h6 className="my-0">{element.title}</h6>
                    <small className="text-muted text-uppercase">
                      {subString(element.category_id)}
                    </small>
                  </div>
                  <span className="text-muted">
                    ${formatNumber(element.price)} x{element.cantidad}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between bg-light">
                <div className="text-success">
                  <h6 className="my-0">Shipping</h6>
                  {/* <small>EXAMPLECODE</small> */}
                </div>
                <span className="text-success">$0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (ARS)</span>
                <strong>${formatNumber(calcItemTotal())}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-lg-7 ">
            <h4 className="mb-3 pt-4 address">Billing address</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* FirstName */}
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      state.stateName === false
                        ? "border-error"
                        : state.stateName === true
                        ? "border-ok"
                        : ""
                    } `}
                    id="firstName"
                    placeholder="Your Name"
                    value={state.name}
                    onChange={handleChangeName}
                  />
                  {!state.stateName ? (
                    <div className="invalid-feedback d-block">
                      {state.stateNameMsj}
                    </div>
                  ) : null}
                </div>
                {/* LastName */}
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      state.stateLastName === false
                        ? "border-error"
                        : state.stateLastName === true
                        ? "border-ok"
                        : ""
                    }`}
                    id="lastName"
                    placeholder="Your Last Name"
                    value={state.lastName}
                    onChange={handleChangeLastName}
                  />
                  {state.stateLastName === false ? (
                    <div className="invalid-feedback d-block">
                      {state.stateLastNameMsj}
                    </div>
                  ) : null}
                </div>
                {/* Email */}
                <div className="col-6">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted"></span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      state.stateMail === false
                        ? "border-error"
                        : state.stateMail === true
                        ? "border-ok"
                        : ""
                    }`}
                    placeholder="you@example.com"
                    id="email"
                    value={state.email}
                    onChange={handleChangeMail}
                  />
                  {!state.stateMail ? (
                    <div className="invalid-feedback d-block">
                      {state.stateMailMsj}
                    </div>
                  ) : null}
                </div>
                {/* {Phone} */}
                <div className="col-6">
                  <label htmlFor="tel" className="form-label">
                    Phone <span className="text-muted"></span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text px-2" id="basic-addon3">
                      +5411
                    </span>
                    <input
                      type="phone"
                      className={`form-control ${
                        state.statePhone === false
                          ? "border-error"
                          : state.statePhone === true
                          ? "border-ok"
                          : ""
                      }`}
                      placeholder="12345678"
                      id="phone"
                      value={state.phone}
                      onChange={handleChangePhone}
                    />
                    {!state.statePhone ? (
                      <div className="invalid-feedback d-block">
                        {state.statePhoneMsj}
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* {Adress} */}
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      state.stateAddress === false
                        ? "border-error"
                        : state.stateAddress === true
                        ? "border-ok"
                        : ""
                    }`}
                    placeholder="Lavalleja 957 Dpto A"
                    id="address"
                    value={state.address}
                    onChange={handleChangeAddress}
                  />
                  {!state.stateAddress ? (
                    <div className="invalid-feedback d-block">
                      {state.stateAddressMsj}
                    </div>
                  ) : null}
                </div>
              </div>
              <hr className="my-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    value="credit"
                    className="form-check-input"
                    onChange={handleChangePay}
                    checked={state.pay === "credit"}
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    value="debit"
                    className="form-check-input"
                    onChange={handleChangePay}
                    checked={state.pay === "debit"}
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    value="paypal"
                    className="form-check-input"
                    onChange={handleChangePay}
                    checked={state.pay === "paypal"}
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex flex-column ">
                <div className="d-flex justify-content-end">
                  <Link
                    to="/cart"
                    className="btn btn-dark btn-lg border-radius-0 mx-1"
                  >
                    Cancel
                  </Link>
                  <button
                    className={`btn btn-danger btn-lg border-radius-0 mx-1 `}
                    type="submit"
                    disabled={
                      !state.stateName ||
                      !state.stateLastName ||
                      !state.stateMail ||
                      !state.statePhone ||
                      !state.stateAddress
                    }
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;

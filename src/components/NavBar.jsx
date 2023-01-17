import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow nav-color-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand text-color-light align-self-center font-size-brand bold-600"
          to={"/"}
        >
          APB Electronic<span className="text-danger ">.</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="align-self-center collapse navbar-collapse d-lg-flex justify-content-lg-between"
          id="main_nav"
        >
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/category/laptops"}>
                  Laptops
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/category/tablets"}>
                  Tablets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/category/smartphones"}>
                  Smartphones
                </Link>
              </li>
            </ul>
          </div>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

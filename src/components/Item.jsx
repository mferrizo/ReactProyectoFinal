import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../utilities/formatNumber";
import { newArrayStars } from "../utilities/newArrayStars";
import { subString } from "../utilities/subString";

const Item = ({ producto }) => {
  const {
    category_icon,
    category_id,
    promo,
    brand,
    title,
    price,
    pictureUrl,
    stock,
    id,
    stars,
  } = producto;

  // State para estrellas:
  const [first] = useState(newArrayStars(stars));

  return (
    <div className="col-md-8 col-lg-6 col-xl-3 py-4 ">
      <div className="card text-black border-radius-0 link-transition imgzoom">
        <div className="d-flex justify-content-center align-items-center bg-color-grey py-2 text-dark border-line-bottom ">
          <span className="text-uppercase bold-400">{brand}</span>
        </div>
        <div className="d-flex justify-content-end mt-2 me-2 mb-0">
          <span className="badge bg-primary rounded-pill z-index-1 text-end">
            {promo}% OFF
          </span>
        </div>
        <Link className="" to={`/item/${id}`}>
          <img src={pictureUrl} className="card-img-top" alt={brand} />
        </Link>
        <div className="card-body">
          <div className="text-center">
            <p className="text-muted text-uppercase mb-2">
              {subString(category_id)}
            </p>
            <h6 className="card-title text-dark font-size-m my-1">{title}</h6>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <span className="text-danger bold-600 ">
                ${formatNumber(price)}
              </span>
            </div>
            <div className="stars">
              {first.map((element) => (
                <i
                  key={element}
                  className={`fa-solid fa-star fa-xs pt-0 pb-2 text-danger`}
                ></i>
              ))}
            </div>
            <div>
              <i className={`text-muted fa-solid fa-${category_icon}`}></i>
              <span className="p-1 text-dark">
                Stock: <span className="text-dark">{stock}</span>
              </span>
            </div>
          </div>
          <div className="d-grid gap-2 col-12 mx-auto mt-2 ">
            <Link
              className="btn btn-danger border-radius-0 btn-transition"
              to={`/item/${id}`}
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

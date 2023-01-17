import React from "react";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../utilities/firestoreFetch";

const ItemListContainer = ({ greeting }) => {
  // UseState para guardar datos de consulta asincronica:
  const [datos, setDatos] = useState([]);

  // Obtener idCategory:
  const { idCategory } = useParams();

  //UseEffect componentDidUpdate:
  useEffect(() => {
    fetchCategory(idCategory)
      .then((result) => setDatos(result))
      .catch((err) => console.log(err));
  }, [idCategory]);

  //UseEffect componentWillUnmount:
  useEffect(() => {
    return () => {
      setDatos([]);
    };
  }, []);

  return (
    <>
      <header>
        <div className="container pt-5">
          <div className="row text-center pt-2">
            <div className="col-lg-6 m-auto">
              <h1 className="font-size-md light-300">{greeting}</h1>
              {idCategory ? (
                <h4 className="light-300">Shopping by Category</h4>
              ) : (
                <h4 className="light-300">All Categories</h4>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        <ItemList datos={datos} />
      </main>
    </>
  );
};

export default ItemListContainer;

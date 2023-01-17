import React from "react";
import ItemDetail from "./ItemDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchID } from "../utilities/firestoreFetch";
import Spinner from "./Spinner";

const ItemDetailContainer = () => {
  // Obtener id:
  const { id } = useParams();

  // UseState para guardar datos de consulta asincronica:
  const [dato, setDato] = useState({});

  //UseEffect componentDidUpdate:
  useEffect(() => {
    fetchID(id)
      .then((result) => setDato(result))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <main>
      <section>
        <div className="container py-4">
          <div className="row">
            <div className="container pb-5">
              <div className="row d-flex justify-content-center">
                {dato.id ? (
                  <ItemDetail key={dato.id} producto={dato} />
                ) : (
                  <>
                    <Spinner />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ItemDetailContainer;

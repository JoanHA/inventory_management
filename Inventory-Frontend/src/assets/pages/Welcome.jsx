import React from "react";
import { useAuth } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
function Welcome() {
  const { user } = useAuth();
  return (
    <div className=" my-1 w-100">
      <div className="mx-auto   text-center">
        <div className="event_header">
          <h3>Bienvenido al sistema de inventarios de Bioart SA</h3>
        </div>

        <div className="my-3 ">
          <h4 className="">Bienvenido Usuario: {user.username}</h4>
          <h5>Rol: Administrador</h5>
          <h6>{user.email}</h6>
        </div>

        <div className="d-flex flex-row flex-wrap align-items-center flex-wrap justify-content-center gap-4 mt-5">
          <div
            className="card text-white bg-success mb-3"
            style={{ maxWidth: " 24rem" }}
          >
            <div className="card-header  my-0 py-1">
              <h5>Registrar equipos</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer cardFoot py-0">
              <Link className="GoLink" to={"/create"}>
                <span>Ir</span>
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="card text-white bg-secondary mb-3"
            style={{ maxWidth: " 24rem" }}
          >
            <div className="card-header  my-0 py-1">
              <h5>Administrar usuarios</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer cardFoot py-0">
              <Link className="GoLink w-50"  to={"/"}>
                <span>Ir</span>{" "}
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>{" "}
          <div
            className="card text-white bg-warning mb-3"
            style={{ maxWidth: " 24rem" }}
          >
            <div className="card-header my-0 py-1">
              <h5>Crear Eventos</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer  cardFoot py-0">
              <Link className="GoLink" to={"/equipments"}>
                <span>Ir</span>{" "}
                <span className="arrow">
                  <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

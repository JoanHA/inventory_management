import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewAllEquip() {
  const url = "http://localhost:4000/api/equip";

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setDatos(res.data); // Update the state with the received data
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  return (
    <div style={{ marginTop: "0px" }} className="px-5  table-responsive">
      <table className="table table-light table-striped table-hover py-3 px-3 mt-3 ">
        <thead>
          <tr className="table-light">
            <th className="table-light ">ID</th>
            <th className="table-light ">Equipo</th>
            <th className="table-light ">Modelo</th>
            <th className="table-light ">Serial</th>
            <th className="table-light ">Marca</th>
            <th className="table-light ">Estado </th>
            <th className="table-light ">Responsable</th>
            <th>Ver</th>
            <th>Eventos</th>
          </tr>
        </thead>

        {datos.length > 0 ? (
          datos.map((data) => (
            <tbody className="" key={data.id}>
              <tr className="table-light">
                <td className="table-light">{data.id}</td>
                <td className="table-light">{data.name}</td>
                <td className="table-light">{data.model}</td>
                <td className="table-light">{data.serial}</td>
                <td className="table-light">{data.paramName}</td>
                <td className="table-light">{data.status == 1 ? "Activo" : "Inactivo"}</td>
                <td className="table-light">{data.user}</td>
                <td className="table-light">
                  <Link
                    to={`/edit/${data.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Ver
                  </Link>
                </td>
                <td className="">
                  {" "}
                  <Link
                    to={`/create_event/${data.id}`}
                    className="btn btn-success btn-sm"
                  >
                    Añadir Evento
                  </Link>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
            <td colSpan={9}>No hay datos aún...</td>
            </tr>
         
          </tbody>
        )}
      </table>
    </div>
  );
}

export default ViewAllEquip;

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
    <div style={{ marginTop: "0px" }} className="px-5">
      <table className="table table-striped  table-hover py-3 px-3 mt-3 ">
        <tr>
          <th className="">ID</th>
          <th className=" ">Equipo</th>
          <th className=" ">Modelo</th>
          <th className=" ">Serial</th>
          <th className=" ">Marca</th>
          <th className=" ">Estado del equipo</th>
          <th className=" ">Responsable</th>
          <th>Ver</th>
          <th>evento</th>
        </tr>

        {datos.map((data) => (
          <tr className="" key={data.id}>
            <td className="">{data.id}</td>
            <td className="">{data.name}</td>
            <td className="">{data.model}</td>
            <td className="">{data.serial}</td>
            <td className="">{data.paramName}</td>
            <td className="">{data.status==1?"Activo":"Inactivo"}</td>
            <td className="">{data.user}</td>
            <td className="">
              <Link to={`/edit/${data.id}`} className="btn btn-primary btn-sm">
                Ver
              </Link>
            </td>
            <td className="">
              {" "}
              <button className="btn btn-success btn-sm">Crear evento</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ViewAllEquip;

import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <table className="table table-primary table-striped table-hover py-3 px-3 mt-3 " style={{backgroundColor:"beige"}}>
        <tr>
        <th className="table-primary">ID</th>
          <th className=" table-primary">Equipo</th>
          <th className=" table-primary">Modelo</th>
          <th className=" table-primary">Serial</th>
          <th className=" table-primary">Marca</th>
          <th className=" table-primary">Almacenados</th>
          <th className=" table-primary">Responsable</th>
          <th >Ver</th>
          <th >evento</th>
        </tr>

        {datos.map((data) => (
          <tr className="table-primary">
            <td className="table-primary">{data.id}</td>
            <td className="table-primary">{data.name}</td>
            <td className="table-primary">{data.model}</td>
            <td className="table-primary">{data.serial}</td>
            <td className="table-primary">{data.paramName}</td>
            <td className="table-primary">{data.stock}</td>
            <td className="table-primary">{data.user}</td>
            <td className="table-primary"><button className="btn btn-primary btn-sm">Ver</button></td>
            <td className="table-primary"> <button className="btn btn-success btn-sm">Crear evento</button></td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ViewAllEquip;

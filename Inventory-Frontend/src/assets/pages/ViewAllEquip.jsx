import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import view from "../img/icons/view.svg";
import add from "../img/icons/add.svg";
import Table from "../../components/Table";
function ViewAllEquip() {
  const url = "http://localhost:4000/api/equip";

  const [datos, setDatos] = useState([]);
  const { user } = useAuth();
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
  const columns = [
   
    {
      header: "Equipo",
      accessorKey: "name",
    },
    {
      header: "Modelo",
      accessorKey: "model",
    },
    {
      header: "Serial",
      accessorKey: "serial",
    },
    {
      header: "Marca",
      accessorKey: "paramName",
    },
    {
      header: "Estado",
      accessorKey: "statusName",
    },
    {
      header: "Responsable",
      accessorKey: "user",
    },
  ];

  return (
    <>
      <div className="event_header mb-2">Equipos registrados</div>

<div  className="px-5  table-responsive"> 
  <Table data={datos} columns={columns} editType={"edit"}/>
</div>
    
      {/* <div style={{ marginTop: "0px" }}*/}
        {/* 
      <table className="table   table-hover py-3 px-3 mt-1 ">
        <thead>
          <tr className="">
            <th className=" ">Equipo</th>
            <th className=" ">Modelo</th>
            <th className=" ">Serial</th>
            <th className=" ">Marca</th>
            <th className=" ">Estado </th>
            <th className=" ">Responsable</th>
            <th>Opciones</th>
          </tr>
        </thead>

        {datos.length > 0 ? (
          datos.map((data) => (
            <tbody className="" key={data.id}>
              <tr className="">

                <td className="">{data.name}</td>
                <td className="">{data.model}</td>
                <td className="">{data.serial}</td>
                <td className="">{data.paramName}</td>
                <td className="">{data.status == 1 ? "Activo" : "Inactivo"}</td>
                <td className="">{data.user}</td>
                <td className="" colSpan={2}>
                  <Link
                    to={`/edit/${data.id}`}
                    className="btn btn-primary btn-sm mx-1 my-1"
                  >
                    <img src={view} alt="" />
                  </Link>
                  <Link
                    to={`/create_event/${data.id}`}
                    className="btn btn-success btn-sm"
                  >
                    <span className="mx-1">Evento</span>
                    <img src={add} alt=""  width={20}/>
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
      </table> */}
      {/* </div> */}
    </>
  );
}

export default ViewAllEquip;

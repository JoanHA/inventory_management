import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { bringAllFiles, getAllDevices } from "../api/devices.controller";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
function ViewAllEquip() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        
        const res = await getAllDevices();
        setDatos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
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
      accessorKey: "user_name",
    },    
   
  ];

  return (
    <>
     <Helmet>
          <title>Equipos registrados</title>
        </Helmet>
      <div className="event_header mb-2">Equipos registrados</div>
      <Link
      className="my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover px-5 "
        to="/cellphones"
      >
        <span >Celulares</span>
      </Link>
      <div className="px-5  table-responsive">
        <Table data={datos} columns={columns} editType={"edit"} files={true} />
      </div>
    </>
  );
}

export default ViewAllEquip;

import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { getAllDevices } from "../api/devices.controller";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
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
      className="px-5"
        to="/cellphones"
      >
        <span className="">Celulares</span>
      </Link>
      <div className="px-5  table-responsive">
        <Table data={datos} columns={columns} editType={"edit"} />
      </div>
    </>
  );
}

export default ViewAllEquip;

import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getAllDevices } from "../../api/devices.controller";

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
    }
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
      accessorKey: "user",
    },
  ];

  return (
    <>
      <div className="event_header mb-2">Equipos registrados</div>

      <div className="px-5  table-responsive">
        <Table data={datos} columns={columns} editType={"edit"} />
      </div>

  
    </>
  );
}

export default ViewAllEquip;

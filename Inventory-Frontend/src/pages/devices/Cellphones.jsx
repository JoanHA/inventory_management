import React, { useEffect, useState } from "react";
import { getAllMobiles } from "../../api/devices.controller";
import Table from "../../components/Table"
import Volver from "../../components/Volver";
import { Helmet } from "react-helmet";

function Cellphones() {
  const [data, setData] = useState([]);
  
  const columns = [
    {
      header: "IMEI",
      accessorKey: "serial",
    },
    {
      header: "Responsable",
      accessorKey: "user_name",
    },
    {
      header: "Fecha de compra",
      accessorKey: "bought_at",
    },
    {
      header: "Numero de linea",
      accessorKey: "phone",
    },
    {
      header: "Valor Final",
      accessorKey: "final_value",
    },
    {
      header: "Ubicacion",
      accessorKey: "location",
    },
    {
      header: "Estado",
      accessorKey: "status_name",
    },
  ];
  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await getAllMobiles();
        setData(res.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, []);
  return (
    <div>
       <Helmet>
          <title>Celulares</title>
        </Helmet>
      <div className="event_header d-flex flex-row align-items-center justify-content-between">
        Celulares asignados
          <Volver />
      </div>
      <div className="px-4 py-3">
        <Table data={data} columns={columns} editType={"edit"} />
      </div>
    </div>
  );
}

export default Cellphones;

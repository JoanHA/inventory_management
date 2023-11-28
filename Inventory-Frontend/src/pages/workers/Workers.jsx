import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { getWorkers } from "../../api/workers.controllers";
import Volver from "../../components/Volver";
import { Helmet } from "react-helmet";

function Workers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getWorkers();
      setData(res.data);
    };
    getData();
  }, []);
  const columns = [
    {
      header: "Identificación",
      accessorKey: "dni",
    },
    {
      header: "Nombre",
      accessorKey: "name",
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Estado",
      accessorKey: "status_name",
    },
    {
      header: "fecha de ingreso",
      accessorKey: "enroll_date",
    },
  ];
  return (
    <div>
       <Helmet>
          <title>Colaboradores</title>
        </Helmet>
      <div className="event_header d-flex justify-content-between p">
        Administrar colaboradores
        <Volver />
      </div>

      <div className="px-4 py-0 ">
        <div className="d-flex w-100 justify-content-end mt-1 ">

        </div>
        <Table columns={columns} data={data} editType={"editWorker"}></Table>
      </div>
    </div>
  );
}

export default Workers;

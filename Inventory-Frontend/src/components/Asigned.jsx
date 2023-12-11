import React, { useEffect, useState } from "react";
import Table from "./Table";
import { getallequip } from "../api/workers.controllers";
function Asigned({ id }) {
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
      header: "Tipo de equipo",
      accessorKey: "equipment_type_name",
    },
    {
      header: "Estado",
      accessorKey: "status_name",
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const get = async () => {
      try {
        const res = await getallequip(id);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    get();
  }, []);
  const close = ()=>{
    document.getElementById("asignedModal").classList.remove("d-block")
  }

  return (
    <div id="asignedModal" className="modalPage">
      <div className="card w-50 mx-auto py-3">
        <div className="text-center">
          <h2>
            <strong>Equipos asignados</strong>
          </h2>
        </div>

        <div className="px-5 " id="asignedDiv">
          <div className="mb-2">
         
            <button className="btn btn-danger rounded" onClick={close}>Cerrar</button>
          </div>
          {data.length > 0 ? (
            <Table data={data} columns={columns} editType="edit"></Table>
          ) : (
            <div>
              <div className="text-center">
                <h3>Este colaborador no tiene equipos asignados</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Asigned;

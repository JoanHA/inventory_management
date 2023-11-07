import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../api/events.controller";
import view from "../../img/icons/view.svg";
import del from "../../img/icons/delete.svg";
import { useAuth } from "../../../context/AuthContext";
import { URI } from "../../../../config";
import { Link } from "react-router-dom";
import Table from "../../../components/Table";
function View_events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const get = async () => {   
      const res = await getAllEvents();
      setEvents(res.data);
      
    };
    get();
  }, []);
  const columns = [
   
    {
      header: "Cambio",
      accessorKey: "name",
    },
    {
      header: "Tipo cambio",
      accessorKey: "event_type_name",
    },
    {
      header: "Equipo",
      accessorKey: "equip_name",
    },
    {
      header: "Razon ",
      accessorKey: "reason_name",
    },
    {
      header: "Responsable",
      accessorKey: "client",
    },
    {
      header: "Fecha realización",
      accessorKey: "created_at",
    },
  ];
  return (
    <div>
      <div className="event_header mb-2">Cambios realizados</div>
      <div className="px-5 table-responsive">

        <Table data={events} columns={columns} editType={"view_event"}/>
        {/* <table className="table  table-hover  mt-1  ">
          <thead>
            <tr  className="">
               <th  className="">Cambio</th>
               <th  className="">Importancia</th>
               <th  className="">Tipo de cambio</th>
               <th  className="">Equipo</th>
               <th  className="">Razon del cambio</th>
               <th  className="">Responsable </th>
               <th  className="">Fecha de realización</th>
               <th  className="">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ?
              events.map((event) => (
                <tr key={event.id}  className="">
                  <td  className="">{event.name}</td>
                  <td  className="">{event.importance_name}</td>
                  <td  className="">{event.event_type_name}</td>
                  <td  className="">{event.equip_name}</td>
                  <td  className="">{event.reason_name}</td>
                  <td  className="">{user.username}</td>
                  <td  className="">{event.created_at}</td>
                  <td colSpan={2}>
                    <Link className="btn btn-success my-1" to={`/view_event/${event.id}`}>
                      <img src={view} alt="" />
                    </Link>
                  </td>
                </tr>
              )):  (
                <tbody>
                  <tr>
                    <td colSpan="9" rowSpan={9}>No hay datos aún...</td>
                  </tr>
                </tbody>
              )}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default View_events;

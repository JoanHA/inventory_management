import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../api/events.controller";
import view from "../../img/icons/view.svg"
import del from "../../img/icons/delete.svg";
function View_events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res = await getAllEvents();
      console.log(res.data);
      setEvents(res.data);
    };
    get();
  }, []);

  return (
    <div>
     <div className="event_header mb-2">Cambios realizados</div>
      <div className="px-4 table-responsive">
        <table className="table table-striped table-hover ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Cambio</th>
              <th>Importancia</th>
              <th>Tipo de cambio</th>
              <th>Equipo</th>
              <th>Razon del cambio</th>
              <th>Creador </th>
              <th>Fecha de realización</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {events &&
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.name}</td>
                  <td>{event.importance_name}</td>
                  <td>{event.event_type_name}</td>
                  <td>{event.equip_name}</td>
                  <td>{event.reason_name}</td>
                  <td>{event.client}</td>
                  <td>
                    {new Date(event.created_at).toDateString(
                      "es-ES" //here
                    )}
                  </td>
                  <td colSpan={2}>
                    <button className="btn btn-success my-1"><img src={view} alt="" /></button>

                    <button className="btn btn-danger mx-1"><img src={del} alt="" /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View_events;

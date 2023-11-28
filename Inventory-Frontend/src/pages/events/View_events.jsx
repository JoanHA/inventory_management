import React, { useEffect, useState } from "react";
import{ getAllEvents } from "../../api/events.controller";
import { Helmet } from "react-helmet";

import Table from "../../components/Table";
function View_events() {
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
      accessorKey: "user_name",
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
      <Helmet>
          <title>Eventos</title>
        </Helmet>
        <Table data={events} columns={columns} editType={"view_event"}/>
      </div>
    </div>
  );
}

export default View_events;

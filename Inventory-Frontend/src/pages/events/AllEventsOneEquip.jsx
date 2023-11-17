import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsForm from "../../components/EventsForm";
import { Link } from "react-router-dom";
import { getAll } from "../../api/events.controller";
import { Helmet } from "react-helmet";
function AllEventsOneEquip() {
  const params = useParams();//Obtener los parametros

  const [event, setEvent] = useState([]);
  const [equip, setEquip] = useState({});

  const [pages, setPages] = useState(0); //cantidad de paginas segun la cantidad de eventos
  const [currentPage, setCurrentPage] = useState(1); //Pagina actual
  const [items, setItems] = useState(0);   //id del card del evento
//Obtener los eventos del equipo
  useEffect(() => {
    async function getData() {
      const res = await getAll(params.id);
      setEquip(res.data[0]);
      setEvent(res.data);
      setPages(Math.ceil(res.data.length / 2)); //Sacar numero de paginas
    }
    getData();
  }, []);
//Pasar la pagina
  const nexPage = () => {
    if (currentPage < pages) {
      const item1 = items;
      const item2 = items + 1;

      document.getElementById(`${item1}`).classList.add("inactive");
      document.getElementById(`${item2}`).classList.add("inactive");
      setItems(item2 + 1);
      setCurrentPage(currentPage + 1);
      document.getElementById(`${item2 + 1}`).classList.remove("inactive");
      document.getElementById(`${item2 + 2}`).classList.remove("inactive");
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      const item1 = items - 1;
      const item2 = items - 2;

      document.getElementById(`${item1}`).classList.remove("inactive");
      document.getElementById(`${item2}`).classList.remove("inactive");
      setItems(item2);
      setCurrentPage(currentPage - 1);
      document.getElementById(`${items}`).classList.toggle("inactive");
      document.getElementById(`${items + 1}`).classList.toggle("inactive");
    }
  };
  return (
    <>
      <div className="event_header d-flex justify-content-between">
        <Helmet>
          <title>Eventos de equipo</title>
        </Helmet>
        Evento del equipo
        <Link to={`/events`} className="btn btn-secondary btn-sm">
          Volver
        </Link>
      </div>
      <div className="d-flex flex-column px-3 py-1">
        {/* equip data */}
        <div className="d-flex  flex-column  ">
          <div className="event_title">
            <h2>Equipo</h2>
          </div>
          <div className="d-flex gap-3  w-100  flex-row justify-content-center ">
            <div className="form-group col-md-2">
              <label htmlFor="">Serial</label>
              <input
                disabled
                type="text"
                value={equip && equip.serial}
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group  col-md-2">
              <label htmlFor="">Equipo</label>
              <input
                disabled
                value={equip && equip.name}
                type="text"
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        {/* Equip event */}
        <div>
          <div className="event_title">
            <h2>Eventos</h2>
          </div>
          {event.length > 0 ? (
            <>
              <div>
                <div className="d-flex w-100 align-items-center justify-content-center">
                  {/* Botones de paginar (Next, Prev) */}
                  <button onClick={prevPage} className="btn mx-1">
                    Anterior
                  </button>
                  <label htmlFor="">
                    {currentPage} de {pages}
                  </label>
                  <button onClick={nexPage} className="btn mx-1">
                    Siguiente
                  </button>
                </div>

              {/* Renderizar eventos */}
                {event.map((e, i) => (
                  <EventsForm event={event[i]} index={i} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div>Este equipo no tiene eventos</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AllEventsOneEquip;

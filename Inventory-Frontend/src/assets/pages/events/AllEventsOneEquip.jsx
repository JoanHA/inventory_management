import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsForm from "../../../components/EventsForm";
import { Link } from "react-router-dom";
import { getAll } from "../../lib/events/getAllEvents";
import { URI } from "../../../../config";
function AllEventsOneEquip() {
 const params = useParams();
  const [event, setEvent] = useState([]);
  const [equip, setEquip] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await getAll(params.id);
      setEquip(res.data[0]);
      setEvent(res.data);
    }
    getData();
  }, []);
  return (
    <>
      <div className="event_header d-flex justify-content-between">
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
                {/* <EventsForm event={event[0]} /> */}
                {event.map((e,i)=>(
                  <div className="my-2">
                       <EventsForm event={event[i]} />
                  </div>
                
                  ))
                
                }
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

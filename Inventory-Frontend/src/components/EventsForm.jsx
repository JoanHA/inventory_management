import React from "react";
import fileDownload from "js-file-download";
import { URI } from "../../config";
import axios from "axios";
import "../assets/css/event_container.css"
function EventsForm({ event,index }) {  
  const handleClick = (url, filename) => {
      axios
        .get(url, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, filename);
        });
    };
  return (
    <div className={index > 1? "inactive my-2":" my-2"} id={index}>
      <div className=" event_container row flex-wrap ">
        <strong>
          <h5>Evento: {event.event_name}</h5>
        </strong>
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Tipo de evento </label>
          </strong>

          <label htmlFor="">{event.event_type_name}</label>
        </div>
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Importancia</label>
          </strong>

          <label htmlFor="">{event.importance_name}</label>
        </div>{" "}
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Creador del evento</label>
          </strong>

          <label htmlFor="">{event.created_by_name}</label>
        </div>{" "}
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Estado</label>
          </strong>

          <label htmlFor="">{event.status_name}</label>
        </div>{" "}
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Razon </label>
          </strong>

          <label htmlFor="">{event.event_reason_name}</label>
        </div>{" "}
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Fecha de realización </label>
          </strong>

          <label htmlFor="">{event.created_at}</label>
        </div>{" "}
        <div className="col-3 d-flex flex-column col-md-3 col-sm-3">
          <strong>
            <label htmlFor="">Descripcíon</label>
          </strong>

          <label htmlFor="">{event.description}</label>
        </div>
        <div className="col-3  col-md-3 col-sm-3 d-flex flex-column">
          <strong>
            <label htmlFor="">Archivo adjunto</label>
          </strong>
          <button
            // download={data.file}
            className="btn btn-secondary btn-block w-50 btn-sm"
            onClick={() => handleClick(`${URI}${event.file}`, event.file)} //Aqui va la url del paramentro
          >
            {" "}
            Descargar...
          </button>
        </div>
      </div>

      
    </div>
  );
}

export default EventsForm;

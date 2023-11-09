import React, { useEffect } from "react";
import fileDownload from "js-file-download";
import { Link, useParams } from "react-router-dom";
import { URI } from "../../config";
import axios from "axios";
import "../assets/css/event_container.css"
function EventsForm({ event }) {
  const params = useParams();
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
    <div className="">
      <div className=" event_container row ">
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

      {/* <div className="row mx-auto  w-75">
      <div className="form-group my-1 col-md-4">
        <div>
          <label htmlFor="">Nombre del evento</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group my-1  col-md-4">
        <div>
          <label htmlFor="">Tipo de evento</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group  my-1 col-md-4">
        <div>
          <label htmlFor="">Fecha de realizacion</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group mb-2 col-md-4">
        <div>
          <label htmlFor="">Importancia</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group mb-2  col-md-4">
        <div>
          <label htmlFor="">Razon del evento</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group mb-2 col-md-4">
        <div>
          <label htmlFor="">Archivo adjunto</label>
        </div>
        <div>
          <button
            // download={data.file}
            className="btn btn-secondary btn-block w-100"
            //onClick={() => handleClick(file.url, file.name)} //Aqui va la url del paramentro
          >
            {" "}
            Descargar...
          </button>
        </div>
      </div>
      <div className="form-group mb-2 col-md-4">
        <div>
          <label htmlFor="">Responsable</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control  form-control-sm"
          />
        </div>
      </div>
      <div className="form-group mb-2 col-md-4">
        <div>
          <label htmlFor="">Creador del evento</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control  form-control-sm"
          />
        </div>
      </div>

      <div className="form-group  mb-2 col-md-4 ">
        <div>
          <label htmlFor="">Estado del evento</label>
        </div>
        <div>
          <input
            disabled
            type="text"
            className="form-control form-control-sm"
          />
        </div>
      </div>
      <div className="form-group">
        <div>
          <label htmlFor="">Descripcion</label>
        </div>
        <div>
          <textarea
            disabled
            style={{ maxHeight: "50px" }}
            className="form-control form-control-sm"
            rows="2"
          ></textarea>
        </div>
      </div>
      <div className="my-3  ">
       
      </div>
    </div> */}
    </div>
  );
}

export default EventsForm;

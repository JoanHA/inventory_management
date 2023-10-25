import React, { useEffect, useState } from "react";

import { URI } from "../../../../config";
import axios from 'axios';
import "../../css/event.css"
function Create_event() {
const [event_type, setEventType]= useState([])

    useEffect(()=>{
        axios.get(`${URI}utils/events_type`)
      .then(res=>{
        if(res.status ==200){
            setEventType(res.data)
        }
      })
  },[])
  return (
    <div className="card vh-100 w-100 py-1 px-2" style={{border:"None"}}>
      <div className="contenedor">
        <div className="event_header">Nuevo evento</div>
        <div className="equip_data">
          <div className="event_title">
            <h3>datos del equipo</h3>
          </div>
          <div className="input-group flex-nowrap   d-flex flex-row  justify-content-end gap-3">
            <div className="input-group d-flex w-25 flex-row flex-nowrap gap-2 align-items-center">
              <div className="">
                <label htmlFor="">Serial</label>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control form-control-sm "
                  placeholder="Serial"
                />
              </div>
            </div>
            <div className="input-group d-flex w-25 flex-row flex-nowrap gap-2 align-items-center">
              <div className="">
                {" "}
                <label htmlFor=""> Equipo</label>
              </div>
              <div>
                {" "}
                <input
                  type="text"
                  className="form-control form-control-sm "
                  placeholder="Nombre del equipo"
                />
              </div>
            </div>
            <div className="input-group d-flex w-25 flex-row flex-nowrap gap-2 align-items-center">
              <div className="">
                <label htmlFor="">Responsable</label>
              </div>
              <div>
                {" "}
                <input
                  type="text"
                  className="form-control form-control-sm "
                  placeholder="Responsable"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="event_data">
          <div className="event_title">
            {" "}
            <h3>datos del evento</h3>
          </div>

          <form id="form-event" className="container">
            <div className="inputGroup w-100 container  d-flex flex-row flex-wrap ">
              <div className="input-group d-flex flex-column mb-2 w-50 flex-wrap mb-2">
                <label htmlFor="">Nombre del evento</label>{" "}
                <input
                  type="text"
                  className="form-control form-control-sm "
                  placeholder="Nombre del evento"
                  style={{ width: "90% " }}
                />
              </div>
              <div className="input-group d-flex flex-column  mb-2 flex-wrap w-50">
                <label htmlFor="">Descripcion</label>{" "}
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Descripcion del evento"
                  style={{ width: "90% " }}
                />
              </div>
              <div className="input-group d-flex flex-column  mb-2 flex-wrap w-50 mb-2 flex-wrap">
                <label htmlFor="">Tipo de evento</label>

                <div className="d-flex flex-row gap-1">
                  <select
                    className="form-select form-select-sm"
                    name=""
                    id=""
                    style={{ width: "83% " }}
                  >
                    <option>Tipo de evento</option>
                    {event_type.map((event)=>(
                            <option key={event.id}  value={event.id}>{event.name}</option>
                    ))}
                  </select>
                  <button className="btn btn-secondary btn-sm" type="button">+</button>
                </div>
              </div>
              <div className="input-group d-flex flex-column  w-50 mb-2 flex-wrap">
                <label htmlFor="">Fecha de realización</label>{" "}
                <input
                  type="date"
                  className="form-control form-control-sm "
                  placeholder="Fecha del evento"
                  style={{ width: "90% " }}
                />
              </div>
           
              <div className="input-group d-flex flex-column  w-50 mb-2 flex-wrap">
                <label htmlFor="">Importancia</label>{" "}
                <select
                  className="form-select form-select-sm"
                  name=""
                  style={{ width: "90% " }}
                  id=""
                >
                  <option>Selecciona importancia...</option>
                  <option value="235">Baja </option>
                  <option value="236">Media</option>
                  <option value="237">Normal</option>
                  <option value="238">Alta</option>
                </select>
              </div>
              <div className="input-group d-flex flex-column w-50  mb-2 flex-wrap">
                <label htmlFor="">Razon del evento</label>{" "}
                <select
                  className="form-select  form-select-sm"
                  name=""
                  style={{ width: "90% " }}
                  id=""
                >
                  <option> Razon del evento</option>
                  <option value="240">Incidente</option>
                  <option value="241">Requerimiento</option>
                </select>
              </div>
              <div className="input-group d-flex flex-column  w-50  mb-2 flex-wrap">
                <label htmlFor="">Adjuntar archivo</label>
                <input
                  type="file"
                  className="form-control form-control-sm "
                  name=""
                  style={{ width: "90% " }}
                  id=""
                />
              </div>
              <div className="mt-3">  <button className="btn btn-success btn-sm">Registrar </button></div>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create_event;

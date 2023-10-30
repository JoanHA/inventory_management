import React, { useEffect, useState } from "react";
import { URI } from "../../../../config";
import "../../css/event.css";
import Add from "../../components/add";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SaveEvent } from "../../lib/saveEvent";
import { saveParam } from "../../lib/saveParams";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function Create_event() {
  //Data from the equipment
  const [event_type, setEventType] = useState([]);
  const [parametro, setParametro] = useState();
  const [nombre, setNombre] = useState();
  const [serial, setSerial] = useState();
  const [client, setClient] = useState();
  const [user1, setUser] = useState();
  const [id, setId] = useState(); //Equipment's id
  const params = useParams(); //params
  const { user } = useAuth(); //context


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //UseEffect for getting the equipment's data
  useEffect(() => {
    const id = params.id;
    axios.get(URI + `api/equip/${id}`).then((res) => {
      const equipo = res.data[0];
      setNombre(equipo.name);
      setSerial(equipo.serial);
      setClient(equipo.user);
      setId(equipo.id);
    });
  }, []);

  //Functions

  //function for submitting the form
  const onSubmit = async (values) => {
    Swal.fire({
      title: "Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        values.client = client;
        values.fileAdjunt = values.fileAdjunt[0];
        values.equip = id;
        values.user = user.id;
        const res = await SaveEvent(values);
        if (res.status == 200) {
          Swal.fire("Saved!", "", "success").then(() => {
            reset();
          });
        }
      } else if (result.isDenied) {
        Swal.fire("Lo cambios no han sido guardados", "", "info");
      }
    });
  };

  //function to open the add view
  const openView = (value, id) => {
    setParametro([value, id]);
    document.querySelector("#addModal").classList.remove("inactive");
  };

  //useEffect for events_type
  useEffect(() => {
    axios.get(`${URI}utils/events_type`).then((res) => {
      if (res.status == 200) {
        setEventType(res.data);
      }
    });
  }, []);
  return (
    <>
      <div> {parametro && <Add param={parametro[0]} val={parametro[1]} />}</div>

   
      <div className="card vh-100 w-100 py-1 px-2" style={{ border: "None" }}>
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
                    value={serial}
                    disabled
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
                    value={nombre}
                    disabled
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

            <form
              id="form-event"
              className="container"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="inputGroup w-100 container  d-flex flex-row flex-wrap ">
                <div className="input-group d-flex flex-column mb-2 w-50 flex-wrap mb-2">
                  <label htmlFor="">Nombre del evento</label>{" "}
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    placeholder="Nombre del evento"
                    style={{ width: "90% " }}
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>

                <div className="input-group d-flex flex-column  mb-2 flex-wrap w-50 mb-2 flex-wrap">
                  <label htmlFor="">Tipo de evento</label>

                  <div className="d-flex flex-row gap-1">
                    <select
                      className="form-select form-select-sm"
                      name=""
                      id=""
                      style={{ width: "83% " }}
                      {...register("event_type", { required: true })}
                    >
                      <option>Tipo de evento</option>
                      {event_type.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                    </select>

                    <button
                      className="btn btn-secondary btn-sm"
                      type="button"
                      onClick={() => {
                        openView("Evento", "200");
                      }}
                    >
                      +
                    </button>
                    {errors.event_type?.type == "required" && (
                      <p className="errorMsg mb-0">Este campo es requerido</p>
                    )}
                  </div>
                </div>

                <div className="input-group d-flex flex-column  w-50 mb-2 flex-wrap">
                  <label htmlFor="">Fecha de realización</label>{" "}
                  <input
                    type="date"
                    className="form-control form-control-sm "
                    placeholder="Fecha del evento"
                    style={{ width: "90% " }}
                    {...register("date", { required: true })}
                  />
                  {errors.date?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>

                <div className="input-group d-flex flex-column  w-50 mb-2 flex-wrap">
                  <label htmlFor="">Importancia</label>{" "}
                  <select
                    className="form-select form-select-sm"
                    name=""
                    {...register("importance", { required: true })}
                    style={{ width: "90% " }}
                    id=""
                  >
                    <option>Selecciona importancia...</option>
                    <option value="235">Baja </option>
                    <option value="236">Media</option>
                    <option value="237">Normal</option>
                    <option value="238">Alta</option>
                  </select>
                  {errors.importance?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
                <div className="input-group d-flex flex-column w-50  mb-2 flex-wrap">
                  <label htmlFor="">Razon del evento</label>{" "}
                  <select
                    className="form-select  form-select-sm"
                    name=""
                    style={{ width: "90% " }}
                    id=""
                    {...register("event_reason", { required: true })}
                  >
                    <option> Razon del evento</option>
                    <option value="240">Incidente</option>
                    <option value="241">Requerimiento</option>
                    <option value="242">Mantenimiento</option>
                  </select>
                  {errors.event_reason?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
                <div className="input-group d-flex flex-column  w-50  mb-2 flex-wrap">
                  <label htmlFor="">Adjuntar archivo</label>
                  <input
                    type="file"
                    className="form-control form-control-sm "
                    style={{ width: "90% " }}
                    id=""
                    {...register("fileAdjunt")}
                  />
                </div>
                <div className="input-group d-flex flex-column  w-100  mb-2 flex-wrap">
                  <label htmlFor="">Responsable</label>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    placeholder="Responsable"
                    style={{ width: "95% ", height: "20px" }}
                    value={client}
                    onChange={(e) => {
                      setClient(e.target.value);
                    }}
                  />
                </div>
                <div className="input-group d-flex flex-column  mb-2 flex-wrap w-100">
                  <label htmlFor="">Descripcion</label>{" "}
                  <textarea
                    name=""
                    id=""
                    rows="3"
                    className="form-control form-control-sm"
                    placeholder="Descripcion del evento"
                    style={{ width: "95%", maxHeight: "100px" }}
                    {...register("description", { required: true })}
                  ></textarea>
                  {errors.description?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>

                <div className="mt-3">
                  <button className="btn btn-success btn-sm">Registrar </button>
                  <Link className="btn btn-danger btn-sm mx-2" to={"/equipments"}> Cancelar</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create_event;

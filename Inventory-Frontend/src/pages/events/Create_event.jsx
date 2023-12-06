import React, { useEffect, useState } from "react";
import "../../assets/css/event.css";
import Add from "../../components/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SaveEvent } from "../../lib/saveEvent";
import { getDevice } from "../../api/events.controller";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { getEvents_type } from "../../api/events.controller";
import { getWorkers } from "../../api/workers.controllers";
import Volver from "../../components/Volver";
import { Helmet } from "react-helmet";
function Create_event() {
  //Data from the equipment
  const [event_type, setEventType] = useState([]);
  const [parametro, setParametro] = useState();
  const [nombre, setNombre] = useState();
  const [serial, setSerial] = useState();
  const [client, setClient] = useState();
  const [id, setId] = useState(); //Equipment's id
  const params = useParams(); //params
  const { user } = useAuth(); //context
  const [workers,setWorkers] = useState([])
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //UseEffect for getting the equipment's data
  useEffect(() => {
   
    const getDev = async () => {
      const id = params.id;
      const res = await getDevice(id);
      await getWork();
      const equipo = res.data[0];
      setNombre(equipo.name);
      setSerial(equipo.serial);
      setClient(equipo.user_name);
      setId(equipo.id);
      reset({
        client: res.data[0].user
      })
    };
    getDev();
  
  }, []);

  //Functions

   //Llenar los select de los trabajadore
   const getWork = async () => {
    try {
      const res = await getWorkers();
      setWorkers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //function for submitting the form
  const onSubmit = async (values) => {
  
    Swal.fire({
      title: "Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
   
        values.equip = id;
        values.user = user.id;
        values.file = values.file[0];

        //Saving data for the backend
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("name", values.name);
        formData.append("serial", values.serial);
        formData.append("description", values.description);
        formData.append("client", values.client);
        formData.append("equip", values.equip);
        formData.append("user", values.user);
        formData.append("date", values.date);
        formData.append("event_type", values.event_type);
        formData.append("event_reason", values.event_reason);
        formData.append("importance", values.importance);
        formData.append("status", values.status);
        

        const res = await SaveEvent(formData); //this the one that call tthe function in the backend
        if (res.status == 200) {
          Swal.fire("Saved!", "", "success").then(() => {
            navigate("/events");
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
  const getEvents = async () => {
    const res = await getEvents_type();
    if (res.status == 200) {
      setEventType(res.data);
    }
  };
  //useEffect for events_type
  useEffect(() => {
    getEvents()
  }, []);
  const handleSave = ()=>{
    getEvents();
  }
  return (
    <>
      <div> {parametro && <Add param={parametro[0]} val={parametro[1]}  OnSaving={handleSave}/>}</div>
      <Helmet>
          <title> Crear Evento</title>
        </Helmet>
      <div className="card vh-100 w-100 py-1 px-2" style={{ border: "None" }}>
        <div className="contenedor">
          <div className="event_header d-flex justify-content-between">
            Nuevo evento{" "}
            <Volver />
          </div>
          <div className="equip_data">
            <div className="event_title">
              <h3>datos del equipo</h3>
            </div>
            <div className="input-group flex-nowrap   d-flex flex-row  justify-content-center gap-3">
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
              className="container px-0 py-0"
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
                      <option value="">Tipo de evento</option>
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
                  </div>
                  {errors.event_type?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
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
                    <option value="">Selecciona importancia...</option>
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
                    <option value=""> Razon del evento</option>
                    <option value="240">Incidente</option>
                    <option value="241">Requerimiento</option>
                    <option value="242">Mantenimiento</option>
                    <option value="243">Repotenciamiento</option>
                  </select>
                  {errors.event_reason?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
                <div className="input-group d-flex flex-column  w-50  mb-2 flex-wrap">
                  <label htmlFor="">Adjuntar archivo</label>

                  <input
                    id="SentFile"
                    type="file"
                    className="form-control form-control-sm "
                    style={{ width: "90% " }}
                    {...register("file")}
                  />
                </div>
                <div className="input-group d-flex flex-column  w-50  mb-2 flex-wrap">
              
                   <label>Responsable</label>
              <select
               style={{ width: "90% ", height: "20px" }}
                {...register("client")}
                className="form-select form-select-sm"
              >
                <option value="" > Selecciona un responsable</option>
                {workers &&
                  workers.map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name}
                    </option>
                  ))}
              </select>
              {errors.user?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
                </div>
                <div className="input-group d-flex flex-column  w-50  mb-2 flex-wrap">
                  <label htmlFor="">Estado</label>
                  <select
                    name=""
                    id=""
                    className="form-select form-select-sm"
                    style={{ width: "90% " }}
                    {...register("status")}
                  >
                    <option value="280">Pendiente</option>
                    <option value="281">Cancelado</option>
                    <option value="282">Realizado</option>
                  </select>
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
                  <Link
                    className="btn btn-danger btn-sm mx-2"
                    to={"/equipments"}
                  >
                    {" "}
                    Cancelar
                  </Link>
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

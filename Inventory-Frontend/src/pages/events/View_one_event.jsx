import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneEvent } from "../../api/events.controller";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { URI } from "../../../config";
import { updateStatus } from "../../api/events.controller";
import fileDownload from "js-file-download";
import axios from "axios";
import { Helmet } from "react-helmet";
import { updateEvent } from "../../api/events.controller";
import Volver from "../../components/Volver";
import { useAuth } from "../../context/AuthContext";
import "../../assets/css/event.css";

function View_one_event() {
  const { user } = useAuth();
  const navigate = useNavigate()
  //change the status of the status changer
  const [ChangeStatus, setChangeStatus] = useState("NONE");
  const params = useParams();
  const [equipo, setEquipo] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [fileUrl, setFileUrl] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await getOneEvent(params.id);
      setEquipo(res.data[0].equip);

      const datos = res.data[0];
      setData(datos);
      setFileUrl(`${URI}${datos.file}`);
      const fecha = datos.created_at.split("T");

      reset({
        name: datos.name,
        date: fecha[0],
        description: datos.description,
        importance: datos.importance_name,
        event_reason: datos.reason_name,
        event_type: datos.event_type_name,
        client: datos.user_name,
        user: datos.user,
        status: datos.status_name,
        serial: datos.serial,
        equip: datos.equip_name,
        user_id: datos.client,
      });
    }
    getData();
  }, []);

  const onSubmit = (data) => {
    async function update(status) {
      const res = await updateStatus(params.id, status);
   
      if (res.status === 200) {
        swal.fire("Estado Cambiado", "", "success").then(() => {
       navigate("/events")
        });
      }
    }
    update(data.newStatus);
  };
  const handleClick = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      })
      .catch((error) => {
        swal.fire("Este evento no tiene archivos para descargar", "", "info");
      });
  };

  const handleEdit = async () => {
    const datos = {
      name: watch("name"),
      description: watch("description"),
    };
    try {
      const res = await updateEvent(params.id, datos);

      if (res.status === 200) {
        swal.fire("Editado correctamente", "", "success").then(() => {
          navigate("/events")
        });
      }
    } catch (error) {
      swal.fire("Tuvimos un error, intenta mas tarde", "", "error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="event_header mb-2  d-flex justify-content-between">
        Evento del equipo <Volver />
        <Helmet>
          <title>Eventos equipo</title>
        </Helmet>
      </div>
      <div className="d-flex flex-column px-3 py-1">
        {/* equip data */}
        <div className="d-flex  flex-column  ">
          <div className="d-flex gap-3  w-100  flex-row justify-content-center  align-items-center ">
            <h3 className="mt-3 mb-0">Equipo</h3>
            <div className="form-group col-md-2">
              <label htmlFor="">Serial</label>
              <input
                disabled
                type="text"
                {...register("serial")}
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group   col-md-2">
              <label htmlFor="">Equipo</label>
              <input
                disabled
                type="text"
                {...register("equip")}
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        {/* Equip event */}
        <div>
          <div className="event_title ">
            <h2>Evento</h2>
          </div>

          <div className="">
            <div className="row mx-auto  w-75">
              <div className="form-group my-1  col-md-4">
                <div>
                  <label htmlFor="">Nombre del evento</label>
                </div>
                <div>
                  <input
                    type="text"
                    {...register("name")}
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
                    {...register("event_type")}
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
                    {...register("date")}
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
                    {...register("importance")}
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
                    {...register("event_reason")}
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
                    to={fileUrl}
                    download={data.file}
                    className="btn btn-secondary btn-block w-100"
                    onClick={() => handleClick(fileUrl, data.file)}
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
                    {...register("client")}
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
                    {...register("user")}
                    type="text"
                    className="form-control  form-control-sm"
                  />
                </div>
                <input type="hidden" {...register("user_id")} />
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
                    {...register("status")}
                  />
                </div>
                <div
                  style={{
                    display: `${ChangeStatus}`,
                    border: "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                  className=" px-2 pt-1"
                  id="changeStatus"
                >
                  <div
                    className="py-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setChangeStatus("NONE");
                    }}
                  >
                    x
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <select
                      name=""
                      id=""
                      className="form-select"
                      {...register("newStatus", { required: true })}
                    >
                      <option value="">Selecciona un estado</option>
                      <option value="280">Pendiente</option>
                      <option value="281">Cancelado</option>
                      <option value="282">Realizado</option>
                    </select>
                    {errors.newStatus?.type == "required" && (
                      <p className="errorMsg">Este campo es requerido</p>
                    )}
                    <button className="btn btn-dark my-1 ">
                      Cambiar estado
                    </button>
                  </form>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label htmlFor="">Descripcion</label>
                </div>
                <div>
                  <textarea
                    {...register("description")}
                    style={{ maxHeight: "50px" }}
                    className="form-control form-control-sm"
                    rows="2"
                  ></textarea>
                </div>
              </div>
              <div className="my-3  d-flex flex-wrap justify-content-center align-items-center">
                {user.rol == 272 ? (
                  ""
                ) : (
                  <>
                    <button
                      className="btn btn-success py-2 px-2"
                      type="button"
                      onClick={handleEdit}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-warning mx-2 my-2 py-2 "
                      onClick={() => {
                        setChangeStatus("BLOCK");
                      }}
                    >
                      Cambiar estado
                    </button>
                  </>
                )}
                <Link
                  className="btn btn-info  mx-1 py-2"
                  to={`/AllEvents/${equipo}`}
                >
                  Ver eventos de este equipo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default View_one_event;

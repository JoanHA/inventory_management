import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Add from "./Add";
import Masive from "./Masive";
import { useAuth } from "../context/AuthContext";
import { getParameters } from "../api/devices.controller";
import "./../assets/css/create.css";
import { getWorkers } from "../api/workers.controllers";

import { MdOutlineFileDownload  } from "react-icons/md";
function DevicesForm() {
  //Constantes
  const params = useParams();
  const [parametro, setParametro] = useState();
  const { user } = useAuth();

  const [marks, setMarks] = useState([]);
  const [type, setType] = useState([]);
  const [disk, SetDisk] = useState([]);
  const [ram, setRam] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [isPhone, SetIsPhone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  //Funciones -----------------
  const openView = (value, id) => {
    setParametro([value, id]);
    document.querySelector("#addModal").classList.remove("inactive");
  };
  const getParamFunction = async () => {
    try {
      var marcas = [];
      var rams = [];
      var equipos = [];
      var discos = [];

      const res = await getParameters();
      const datos = res.data; // datos
      datos.map((dato) => {
        //201: Marcas, 203: tipo de disco duro, 204: tipo de ram,  208: tipo de equipo

        switch (dato.paramtype_id) {
          case 201:
            marcas.push([dato.id, dato.name]);
            break;
          case 203:
            discos.push([dato.id, dato.name]);
            break;
          case 204:
            rams.push([dato.id, dato.name]);
            break;
          case 208:
            equipos.push([dato.id, dato.name]);
            break;
          default:
            break;
        }
      });
      ///// desde AQUI GUARDO LOS DATOS EN LOS ESTADOS
      setMarks(marcas);
      setRam(rams);
      setType(equipos);
      SetDisk(discos);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const onSubmit = async (data) => {
    // createEquip(data);
    console.log(data);
  };
  const handleSave = () => {
    getParamFunction();
  };
  const masive = () => {
    document.getElementById("modalPage").style.display = "Block";
  };
  const getWork = async () => {
    try {
      const res = await getWorkers();
      setWorkers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = () => {
    const valor = document.getElementById("selectChanger").value;
    if (valor == 263) {
      SetIsPhone(true);
    } else {
      SetIsPhone(false);
    }
  };
  //--------------------------------------------

  //UseEffects
  useEffect(() => {
    getWork();
    getParamFunction();
  }, []);

  return (
    <>
      {/* Agregar parametro y envio masivo */}
      <div>
        <div>
          {parametro && (
            <Add
              param={parametro[0]}
              val={parametro[1]}
              OnSaving={handleSave}
            />
          )}
        </div>
        <Masive></Masive>
      </div>

      <div className="px-4 py-3">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="row" id="Equip-row">
            {/* Primera fila */}
            <div className="col-12 col-sm-3  col-md-3 ">
              <label> Nombre del equipo</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="form-control form-control-sm"
                placeholder="Nombre del producto..."
              />
              {errors.name?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className="col-12 col-sm-3 col-md-3">
              <label>Responsable</label>
              <select
                {...register("user")}
                className="form-select form-select-sm"
              >
                <option value="">Selecciona un responsable</option>
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
            {/* Segunda fila */}
            <div className=" col-6 col-sm-3 col-md-3">
              <label htmlFor=""> Modelo</label>
              <input
                type="text"
                {...register("model", { required: true })}
                className="form-control form-control-sm"
                placeholder="Modelo..."
              />
              {errors.model?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className=" col-6 col-sm-3 col-md-3">
              <label htmlFor=""> Oficina</label>
              <input
                type="text"
                {...register("office", { required: true })}
                className="form-control form-control-sm"
                placeholder="Oficina..."
              />
              {errors.office?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>

            <div className=" col-12 col-sm-3 col-md-3">
              <label>IMEI/Serial</label>
              <input
                type="text"
                {...register("serial", { required: true })}
                className="form-control form-control-sm"
                placeholder="Código de serie"
              />
              {errors.serial?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className=" col-12 col-sm-3 col-md-3">
              <label>Marca</label>
              <div className="d-flex flex-row">
                <select
                  {...register("mark")}
                  className="form-select form-select-sm"
                  style={{ maxHeight: "31px", overflowY: "auto" }}
                >
                  <option value="">Selecciona una marca...</option>

                  {marks.map((object) => (
                    <option key={object[0]} value={object[0]}>
                      {object[1]}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="btn btn-secondary addBtn px-2 "
                  onClick={() => {
                    openView("Marca", "201");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className=" col-12 col-sm-3 col-md-3">
              <label>Tipo de equipo</label>
              <div className="d-flex flex-row">
                <select
                  className="form-select form-select-sm"
                  id="selectChanger"
                  {...register("equip_type")}
                  onChange={() => {
                    handleChange();
                  }}
                >
                  <option value="">Selecciona el tipo...</option>
                  {type.map((object) => (
                    <option key={object[0]} value={object[0]}>
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary addBtn px-2"
                  onClick={() => {
                    openView("Tipo de equipo", "208");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Quinta fila */}
            <div className="col-12 col-sm-6 col-md-3 ">
              <label>Cantidad de ram</label>
              <div className="d-flex align-item-center justify-content-center">
                <input
                  type="number"
                  {...register("ram")}
                  className="form-control GB-TB form-control-sm"
                  placeholder="0"
                />
                <select
                  className="form-select form-select-sm md-3"
                  style={{ width: "80px" }}
                  {...register("formatRam")}
                >
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
            </div>
            <div className=" col-12  col-sm-6 col-md-3 ">
              <label htmlFor="">Cantidad de disco duro</label>
              <div className="d-flex justify-content-center">
                <input
                  type="number"
                  {...register("hard_disk")}
                  className="form-control form-control-sm"
                  placeholder="0"
                />
                <select
                  className="form-select form-select-sm md-3 GB-TB"
                  style={{ width: "80px" }}
                  {...register("formatDisk")}
                >
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
            </div>
            <div className=" col-12 col-sm-3 col-md-3">
              <label>Tipo de ram</label>
              <div className="d-flex flex-row">
                <select
                  {...register("ram_type")}
                  className="form-select form-select-sm"
                >
                  <option value="">Tipo de ram</option>
                  {ram.map((object) => (
                    <option key={object[0]} value={object[0]}>
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary addBtn px-2"
                  onClick={() => {
                    openView("Tipo de ram", "204");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className=" col-12 col-sm-3 col-md-3">
              <label>Tipo de disco duro</label>
              <div className="d-flex flex-row">
                <select
                  {...register("hard_type")}
                  className="form-select form-select-sm"
                >
                  <option value="">Selecciona el tipo...</option>
                  {disk.map((object) => (
                    <option key={object[0]} value={object[0]}>
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm  addBtn px-2 "
                  onClick={() => {
                    openView("Tipo de disco duro", "203");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Sexta fila */}
            <div className="col-md-3">
              <label>Procesador</label>
              <input
                type="text"
                {...register("proccesor")}
                className="form-control form-control-sm"
                placeholder="Nombre de procesador"
              />
            </div>
            <div className="col-md-3">
              <label>Sistema operativo</label>
              <input
                type="text"
                {...register("system")}
                className="form-control form-control-sm"
                placeholder="Nombre del sistema operativo"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="">Estado del equipo</label>
              <select
                name=""
                id=""
                className="form-select form-select-sm"
                {...register("status")}
              >
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </select>
            </div>
            {/* Septima fila */}
            <div className="col-md-3 my-2">
              <label htmlFor="">Antivirus</label>
              <input
                type="text"
                name="antivirus"
                {...register("antivirus")}
                className="form-control form-control-sm"
                placeholder="Antivirus"
              />
            </div>
            <div className="col-md-3 ">
              <label htmlFor="">Fecha de compra</label>
              <input
                type="date"
                {...register("bought_at")}
                className="form-control form-control-sm"
              />
            </div>
            <div className="col-md-2 ">
              <label htmlFor="">Valor inicial</label>
              <input
                type="number"
                placeholder="00..."
                {...register("init_value")}
                className="form-control form-control-sm"
              />
            </div>
            <div className="col-md-2 ">
              <label htmlFor="">Valor final</label>
              <input
                type="number"
                placeholder="00..."
                {...register("final_value")}
                className="form-control form-control-sm"
              />
            </div>
            <div className="col-md-2 ">
              <label>Valor subsidiado</label>
              <input
                type="text"
                placeholder="0..."
                {...register("sub_value")}
                className="form-control form-control-sm"
              />
            </div>
            {params.id ? (
              <> <div className="col-md-3  d-flex flex-row ">
              <div>
                <label>Agregar/descargar archivos</label>
                <input
                  type="file"
                  multiple
                  {...register("files")}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="align-self-end ">
                <button
                  className="btn btn-dark w-100"
                  style={{ maxHeight: "31px" }}
                >
                  <MdOutlineFileDownload  size={"1.5rem"} className="mb-5 align-self-center" />
                </button>
              </div>
            </div>
               
              </>
            ) : (
              <>
                <div className="col-md-3  ">
                 
                 <label>Agregar archivos</label>
                 <input
                   type="file"
                   multiple
                   {...register("files")}
                   className="form-control form-control-sm"
                 />
             
             </div>
              </>
            )}

            <div className="col-md-3 ">
              <label>Fecha de entrega</label>
              <input
                type="date"
                {...register("deliver_at")}
                className="form-control form-control-sm"
              />
            </div>
            {isPhone ? (
              <div className="col-md-3 ">
                <label>Numero Celular</label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  placeholder="3209782***"
                  className="form-control form-control-sm"
                />
              </div>
            ) : (
              ""
            )}

            <div className={isPhone ? `col-md-9` : "col-md-12"}>
              <label>Comentario</label>
              <textarea
                {...register("description", { required: true })}
                cols="30"
                className="form-control form-control-sm"
                style={{ resize: "none" }}
                placeholder="Descripción..."
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>

            {/* Boton de envio */}
            <div className="col-md-12">
              <button
                className=" btn btn-primary text-center my-3"
                 disabled={user.rol == 272 ? true : false}
              >
                Agregar
                <img alt="" style={{ marginLeft: "10px" }} />
              </button>
              <Link className="btn btn-success mx-3 " to={"/equipments"}>
                Ver todo
              </Link>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={masive}
                 disabled={user.rol == 272 ? true : false}
              >
                Carga masiva
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default DevicesForm;

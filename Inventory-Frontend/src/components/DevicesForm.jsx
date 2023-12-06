import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import Add from "./Add";
import Masive from "./Masive";
import { useAuth } from "../context/AuthContext";
import {
  getParameters,
  getOneDevice,
  onDelete,
} from "../api/devices.controller";
import "./../assets/css/create.css";
import { getWorkers } from "../api/workers.controllers";
import DownloadHistorical from "./DownloadHistorical";
import { MdOutlineFileDownload, MdDelete } from "react-icons/md";
import { createEquip, update } from "../api/devices.controller";
import FileList from "./FileList";
import { saveFiles } from "../api/devices.controller";
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

  const [equip, setEquip] = useState({});

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
        if (dato.param_state == 1) {
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

  //Guardar/editar datos
  const onSubmit = async (data) => {
    //Editando
    if (params.id) {
      var Editado = false;
      const res = await update(params.id, data);
      if (res.status === 200) {
        Editado = true;
      } else {
        Editado = false;
      }

      if (data.files.length > 0) {
        try {
          const formData = new FormData();
          for (let i = 0; i < data.files.length; i++) {
            formData.append("files", data.files[i]);
          }
          const res = await saveFiles(params.id, formData);

          if (res.status == 200) {
            Editado = true;
          } else {
            Editado = false;
          }
        } catch (error) {
          swal.fire(
            "El archivo que le agregaste al equipo no se pudo agregar, intenta mas tarde",
            "",
            "error"
          );
        }
      }
      if (Editado) {
        swal.fire("Datos actualizados", "", "success").then(() => {
          window.location.reload();
        });
      } else {
        swal.fire("No se pudo actualizar los datos", "", "error");
      }
      //creando
    } else {
      const formData = new FormData();

      for (let i = 0; i < data.files.length; i++) {
        formData.append("files", data.files[i]);
      }
      for (const key in data) {
        if (key !== "files") {
          formData.append(key, data[key]);
        }
      }

      await createEquip(formData);
    }
  };

  //Recargar los selects si se crea un nuevo parametro
  const handleSave = () => {
    getParamFunction();
  };

  //Abrir la vista para la carga masiva
  const masive = () => {
    document.getElementById("modalPage").style.display = "Block";
  };
  //Llenar los select de los trabajadore
  const getWork = async () => {
    try {
      const res = await getWorkers();
      setWorkers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Ver si esta llenando un telefono o un equip aparte
  const handleChange = () => {
    const valor = document.getElementById("selectChanger").value;
    if (valor == 263) {
      SetIsPhone(true);
    } else {
      SetIsPhone(false);
    }
  };
  //LLenanr los campos del equipo
  const getOne = async () => {
    try {
      const id = params.id;
      const res = await getOneDevice(id);
      const equipData = res.data[0];
      if (equipData.equipment_type == 263) {
        SetIsPhone(true);
      }

      setEquip(res.data[0]); //Darle formato a el valor de ram y disco duro
      // var ramFormat = equipData.ram.toString().split(" ");
      // var diskFormat = equipData.hard_disk.toString().split(" ");
      // const ram = ramFormat[0];
      // const disk = diskFormat[0];
      // const ramQty = ramFormat[1];
      // const diskQty = diskFormat[1];
  

      // setdiskQty(diskQty);
      // setramQty(ramQty);

      reset({
        name: equipData.name,
        model: equipData.model,
        serial: equipData.serial,
        user: equipData.user,
        office: equipData.office,
        description: equipData.description,
        proccesor: equipData.proccesor,
        system: equipData.system,
        antivirus: equipData.antivirus,
        ram: equipData.ram,
        hard_disk: equipData.hard_disk,
        status: equipData.status,
        bought_at: equipData.bought_at.replaceAll("/", "-"),
        deliver_at: equipData.deliver_at.replaceAll("/", "-"),
        init_value: equipData.init_value,
        final_value: equipData.final_value,
        sub_value: equipData.sub_value,
        phone: equipData.phone,
        location: equipData.location,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //--------------------------------------------

  //UseEffects
  useEffect(() => {
    getWork();
    getParamFunction();

    if (params.id) {
      getOne();
    }
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
      <FileList id={params.id} />
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

            <div className="col-12 col-sm-3 col-md-3">
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
                  {...register("mark", { required: true })}
                  className="form-select form-select-sm"
                  style={{ maxHeight: "31px", overflowY: "auto" }}
                >
                  <option value="">Selecciona una marca...</option>
                  {params.id && (
                    <option value={equip.mark} selected>
                      {equip.mark_name}
                    </option>
                  )}
                  {marks.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      className={equip.mark == object[0] ? "d-none" : ""}
                    >
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
              {errors.mark?.type == "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className=" col-12 col-sm-3 col-md-2">
              <label>Tipo de equipo</label>
              <div className="d-flex flex-row">
                <select
                  className="form-select form-select-sm"
                  id="selectChanger"
                  {...register("equip_type", { required: true })}
                  onChange={() => {
                    handleChange();
                  }}
                >
                  <option value="">Selecciona el tipo...</option>
                  {params.id && (
                    <option value={equip.equipment_type} selected>
                      {equip.equipment_type_name}
                    </option>
                  )}
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
              {errors.equip_type?.type == "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            {/* Quinta fila */}
            <div className="col-12 col-sm-6 col-md-2 ">
              <label>Cantidad de ram</label>
              <div className="d-flex align-item-center justify-content-center">
                <input
                  type="text"
                  {...register("ram")}
                  className="form-control GB-TB form-control-sm"
                  placeholder="0 GB"
                />
                {/* <select
                  className="form-select form-select-sm md-3"
                  style={{ width: "80px" }}
                  {...register("formatRam")}
                >
                  <option value="GB" selected={ramQty == "GB" ? true : false}>
                    GB
                  </option>
                  <option value="TB" selected={ramQty == "TB" ? true : false}>
                    TB
                  </option>
                </select> */}
              </div>
            </div>
            <div className=" col-12  col-sm-6 col-md-2 ">
              <label htmlFor="">Cantidad de disco duro</label>
              <div className="d-flex justify-content-center">
                <input
                  type="text"
                  {...register("hard_disk")}
                  className="form-control form-control-sm"
                  placeholder="0TB"
                />
                {/* <select
                  className="form-select form-select-sm md-3 GB-TB"
                  style={{ width: "80px" }}
                  {...register("formatDisk")}
                >
                  <option value="GB" selected={diskQty == "GB" ? true : false}>
                    GB
                  </option>
                  <option value="TB" selected={diskQty == "TB" ? true : false}>
                    {" "}
                    TB
                  </option>
                </select> */}
              </div>
            </div>
            <div className=" col-12 col-sm-3 col-md-3">
              <label>Tipo de ram</label>
              <div className="d-flex flex-row">
                <select
                  {...register("ram_type", { required: true })}
                  className="form-select form-select-sm"
                >
                  <option value="">Tipo de ram</option>
                  {params.id && (
                    <option value={equip.ram_type} selected>
                      {equip.ram_type_name}
                    </option>
                  )}
                  {ram.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      className={equip.ram_type == object[0] ? "d-none" : ""}
                    >
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
              {errors.ram_type?.type == "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className=" col-12 col-sm-3 col-md-3">
              <label>Tipo de disco duro</label>
              <div className="d-flex flex-row">
                <select
                  {...register("hard_type", { required: true })}
                  className="form-select form-select-sm"
                >
                  <option value="">Selecciona el tipo...</option>
                  {params.id && (
                    <option value={equip.hard_type} selected>
                      {equip.hard_type_name}
                    </option>
                  )}
                  {disk.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      className={equip.hard_type == object[0] ? "d-none" : ""}
                    >
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
              {errors.hard_type?.type == "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
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
            <div className="col-md-3 ">
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
              <>
                <div className="col-md-3  d-flex flex-row ">
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
                      type="button"
                      className="btn btn-dark w-100"
                      style={{ maxHeight: "31px" }}
                      onClick={() => {
                        document
                          .getElementById("addModal")
                          .classList.remove("d-none");
                      }}
                    >
                      <MdOutlineFileDownload
                        size={"1.5rem"}
                        className="mb-5 align-self-center"
                      />
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
            <div className="col-md-2 ">
              <label htmlFor="">Ubicación</label>
              <input
                type="text"
                placeholder="Cali, Bogota ..."
                {...register("location")}
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
            {params.id ? (
              <div className="col-md-12">
                <button
                  className="btn btn-success text-center my-3 btn-sm py-2"
                  disabled={user.rol == 272 ? true : false}
                >
                  <span className="px-1">Editar</span>
                </button>
                <Link
                  className="btn btn-dark mx-1 py-2  btn-sm"
                  to={`/AllEvents/${params.id}`}
                >
                  Ver eventos de este equipo
                </Link>

                {user.rol == 272 ? (
                  " "
                ) : (
                  <>
                    <Link
                      className="btn btn-primary   py-2 btn-sm "
                      to={`/create_event/${params.id}`}
                    >
                      <span className="px-1">Añadir evento </span>
                    </Link>

                    {user.rol == 273 ? (
                      ""
                    ) : (
                      <Link
                        style={{ maxHeight: "39px" }}
                        className="btn btn-danger mx-1 btn-sm"
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        onClick={() => {
                          onDelete(params.id);
                        }}
                      >
                        <MdDelete size={"1.8rem"} />
                      </Link>
                    )}
                  </>
                )}
                <DownloadHistorical id={params.id} />
              </div>
            ) : (
              <div className="col-md-12">
                <button
                  className=" btn btn-primary text-center my-3"
                  disabled={user.rol == 272 ? true : false}
                >
                  Agregar
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
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default DevicesForm;

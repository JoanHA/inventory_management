import "../css/create.css";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URI } from "../../../config";
import { onDelete } from "../lib/Ondelete";
import { update } from "../lib/updateEquip.js";
import Add from "../../components/Add.jsx";
import edit from "../img/icons/edit.svg";
import { getOneDevice, getParameters} from "../../api/devices.controller.js";
import addBtn from "../img/icons/add.svg";
import del from "../img/icons/delete.svg";
function View_equip() {
  //Use form para obtener los datos del formulario

  //id del equipo
  const params = useParams();
  //ENDPOINT
  const url = URI;

  //datos del  equipo
  const [equip, setEquip] = useState({});
  const [ramQty, setramQty] = useState("");
  const [diskQty, setdiskQty] = useState("");

  const [marks, setMarks] = useState([]);
  const [type, setType] = useState([]);
  const [disk, SetDisk] = useState([]);
  const [ram, setRam] = useState([]);

  const [parametro, setParametro] = useState();

  //Method to save the data un the DB

  //llenado de datos del equipo
  useEffect(() => {
    const getOne = async () => {
      try {
        const id = params.id;
        const res = await getOneDevice(id);
        const equipData = res.data[0];
        setEquip(res.data[0]);

        //Darle formato a el valor de ram y disco duro
        var ramFormat = equipData.ram.toString().split(" ");
        var diskFormat = equipData.hard_disk.toString().split(" ");
        const ram = ramFormat[0];
        const disk = diskFormat[0];
        const ramQty = ramFormat[1];
        const diskQty = diskFormat[1];

        setdiskQty(diskQty);
        setramQty(ramQty);
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
          ram: ram,
          hard_disk: disk,
        });
      } catch (error) {
        console.log(error);
      }
    };


    const fillSelects = async ()=>{
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
             ///// desde AQUI GUARDO LOS DATOS EN LOS ESTADOS
             setMarks(marcas);
             setRam(rams);
             setType(equipos);
             SetDisk(discos);
        });
      } catch (error) {
        console.log(error)
      }
     
    }
    getOne();
    fillSelects();
  }, []);

  //Vista para agregar parametros
  const openView = (value, id) => {
    setParametro([value, id]);

    document.querySelector("#addModal").classList.remove("inactive");
  };

  //manejo del formulario
  const {
    register,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();

  ///guardado de datos para editar
  const onSubmit = (e) => {
    e.preventDefault();
    const data = watch();
    console.log(data);

    async function updateEquips() {
      try {
        const res = await update(params.id, data);
        if (res.data.status == 200) {
          swal.fire("Editado", "", "success").then(() => {
            location.reload();
          });
        }
      } catch (error) {}
    }
    updateEquips();
  };

  return (
    <>
      <div> {parametro && <Add param={parametro[0]} val={parametro[1]} />}</div>
      <div className="event_header d-flex justify-content-between">
        Editar equipo{" "}
        <Link to={"/equipments"} className="btn btn-sm btn-secondary">
          Volver
        </Link>
      </div>
      <div className="px-4 py-2">
        <form action="" onSubmit={onSubmit}>
          <div className="row" id="Equip-row">
            {/* Primera fila */}
            <div className="col-12 col-sm-6  col-md-6 ">
              <label htmlFor=""> Nombre del equipo</label>
              <input
                type="text"
                {...register("name", { required: true })}
                id=""
                className="form-control form-control-sm "
                placeholder="Nombre del producto..."
              />
            </div>
            <div className=" col-12 col-sm-6 col-md-6">
              <label htmlFor=""> Responsable</label>
              <input
                type="text"
                {...register("user", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Responsable..."
              />
            </div>
            {/* Segunda fila */}
            <div className=" col-6 col-sm-6 col-md-6">
              <label htmlFor=""> Modelo</label>
              <input
                type="text"
                {...register("model", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Modelo..."
                disabled
              />
            </div>
            <div className=" col-6 col-sm-6 col-md-6">
              <label htmlFor=""> Oficina</label>
              <input
                type="text"
                {...register("office", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Oficina..."
              />
            </div>
            {/* Tercera fila */}
            <div className="col-md-12">
              <label htmlFor="">Descripcion</label>
              <textarea
                {...register("description", { required: true })}
                id=""
                cols="30"
                className="form-control form-control-sm"
                style={{ resize: "none" }}
                placeholder="Descripción..."
              ></textarea>
            </div>
            {/* cuarta fila */}
            <div className=" col-4 col-sm-4 col-md-4">
              <label htmlFor="">Serial</label>
              <input
                type="text"
                {...register("serial", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Código de serie"
                disabled
              />
            </div>

            <div className=" col-4 col-sm-4 col-md-4">
              <label htmlFor="">Marca</label>
              <div className="d-flex flex-row">
                <select
                  id=""
                  {...register("mark", { required: true })}
                  className="form-select form-select-sm"
                  defaultValue={equip.mark}
                >
                  <option value="">Selecciona una marca...</option>
                  {marks.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      selected={equip.mark_name == object[1] ? true : false}
                    >
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary addBtn"
                  onClick={() => {
                    openView("Marca", "201");
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className=" col-4 col-sm-4 col-md-4">
              <label htmlFor="">Tipo de equipo</label>
              <div className="d-flex flex-row">
                <select
                  name=""
                  id=""
                  className="form-select form-select-sm"
                  {...register("equip_type", { required: true })}
                >
                  <option value="">Selecciona el tipo...</option>
                  {type.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      selected={
                        equip.equipment_type_name == object[1] ? true : false
                      }
                    >
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary addBtn"
                  onClick={() => {
                    openView("Tipo de equipo", "208");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Quinta fila */}
            <div className="col-6 col-sm-6 col-md-3 ">
              <label htmlFor="">Cantidad de ram</label>
              <div className="d-flex align-item-center justify-content-center">
                <input
                  type="number"
                  {...register("ram", { required: true })}
                  id=""
                  className="form-control form-control-sm GB-TB"
                  placeholder="0"
                />
                <select
                  name=""
                  id=""
                  className="form-select form-select-sm md-3"
                  style={{ width: "80px" }}
                  {...register("formatRam", { required: true })}
                >
                  <option value="GB" selected={ramQty == "GB" ? true : false}>
                    GB
                  </option>
                  <option value="TB" selected={ramQty == "TB" ? true : false}>
                    TB
                  </option>
                </select>
              </div>
            </div>

            <div className=" col-6  col-sm-6 col-md-3 ">
              <label htmlFor="">Cantidad de disco duro</label>
              <div className="d-flex justify-content-center">
                <input
                  type="number"
                  {...register("hard_disk", { required: true })}
                  id=""
                  className="form-control form-control-sm"
                  placeholder="0"
                />
                <select
                  name=""
                  id=""
                  className="form-select form-select-sm md-3 GB-TB"
                  style={{ width: "80px" }}
                  {...register("formatDisk", { required: true })}
                >
                  <option value="GB" selected={diskQty == "GB" ? true : false}>
                    GB
                  </option>
                  <option value="TB" selected={diskQty == "TB" ? true : false}>
                    {" "}
                    TB
                  </option>
                </select>
              </div>
            </div>
            <div className=" col-6 col-sm-6 col-md-3">
              <label htmlFor="">Tipo de ram</label>
              <div className="d-flex flex-row">
                <select
                  id=""
                  {...register("ram_type", { required: true })}
                  className="form-select form-select-sm"
                >
                  <option value="">Tipo de ram</option>

                  {ram.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      selected={equip.ram_type_name == object[1] ? true : false}
                    >
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary addBtn"
                  onClick={() => {
                    openView("Tipo de ram", "204");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className=" col-6 col-sm-6 col-md-3">
              <label htmlFor="">Tipo de disco duro</label>
              <div className="d-flex flex-row">
                <select
                  {...register("hard_type", { required: true })}
                  id=""
                  className="form-select form-select-sm"
                >
                  <option value="">Selecciona el tipo...</option>

                  {disk.map((object) => (
                    <option
                      key={object[0]}
                      value={object[0]}
                      selected={
                        equip.hard_type_name == object[1] ? true : false
                      }
                    >
                      {object[1]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn btn-secondary addBtn"
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
              <label htmlFor="">Procesador</label>
              <input
                type="text"
                {...register("proccesor", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Nombre de procesador"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="">Sistema operativo</label>
              <input
                type="text"
                {...register("system", { required: true })}
                id=""
                className="form-control  form-control-sm"
                placeholder="Nombre del sistema operativo"
              />
            </div>
            {/* Septima fila */}
            <div className="col-md-2">
              <label htmlFor="">Estado equipo</label>

              <select
                name=""
                id=""
                className="form-select form-select-sm"
                {...register("status", { required: true })}
              >
                <option value="1" selected={equip.status == 1 ? true : false}>
                  Activo
                </option>
                <option value="2" selected={equip.status == 2 ? true : false}>
                  Inactivo
                </option>
              </select>
            </div>
            <div className="col-md-3 ">
              <label htmlFor="">Antivirus</label>
              <input
                type="text"
                name="antivirus"
                {...register("antivirus", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Antivirus"
              />
            </div>

            {/* Boton de envio */}
            <div className="col-md-6">
              <button className="btn btn-success text-center my-3">
                <img src={edit} alt="" />
                <span className="px-1">Editar</span>
              </button>
              <Link
                className="btn btn-primary mx-2 "
                to={`/create_event/${params.id}`}
              >
                <span className="px-1">Añadir evento </span>
                <img src={addBtn} alt="" />
              </Link>

              <Link
                className="btn btn-danger mx-1"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  onDelete(params.id);
                }}
              >
                <img src={del} alt="" />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default View_equip;

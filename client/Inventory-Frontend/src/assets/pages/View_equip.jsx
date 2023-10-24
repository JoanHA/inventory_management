import "../css/create.css";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URI } from "../../../config";
import { onDelete } from "../lib/Ondelete";
import { update } from "../lib/updateEquip.js";

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

  //Method to save the data un the DB

  //llenado de datos del equipo
  useEffect(() => {
    axios
      .get(url + `api/equip/${params.id}`)
      .then((res) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = watch();

    async function updateEquips() {
      update(params.id, data);
    }
    updateEquips();
  };

  return (
    <div className="px-4">
      <form action="" onSubmit={onSubmit}>
        <div className="row" id="Equip-row">
          {/* Primera fila */}
          <div className="col-12 col-sm-6  col-md-6 ">
            <label htmlFor=""> Nombre del equipo</label>
            <input
              type="text"
              {...register("name", { required: true })}
              id=""
              className="form-control"
              placeholder="Nombre del producto..."
            />
          </div>
          <div className=" col-12 col-sm-6 col-md-6">
            <label htmlFor=""> Responsable</label>
            <input
              type="text"
              {...register("user", { required: true })}
              id=""
              className="form-control"
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
              className="form-control"
              placeholder="Modelo..."
            />
          </div>
          <div className=" col-6 col-sm-6 col-md-6">
            <label htmlFor=""> Oficina</label>
            <input
              type="text"
              {...register("office", { required: true })}
              id=""
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
                className="form-select"
              >
                <option value="">Selecciona una marca...</option>
                <option value={equip.mark} selected>
                  {" "}
                  {equip.mark_name}
                </option>
              </select>
              <button type="button" className="btn btn-secondary addBtn">
                +
              </button>
            </div>
          </div>

          <div className=" col-4 col-sm-4col-md-4">
            <label htmlFor="">Tipo de equipo</label>
            <div className="d-flex flex-row">
              <select
                name=""
                id=""
                className="form-select"
                {...register("equip_type", { required: true })}
              >
                <option value="">Selecciona el tipo...</option>
                <option value={equip.equipment_type} selected>
                  {" "}
                  {equip.equipment_type_name}
                </option>
              </select>
              <button type="button" className="btn btn-secondary addBtn">
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
                className="form-control GB-TB"
                placeholder="0"
              />
              <select
                name=""
                id=""
                className="form-select md-3"
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
                className="form-control"
                placeholder="0"
              />
              <select
                name=""
                id=""
                className="form-select md-3 GB-TB"
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
            <select
              id=""
              {...register("ram_type", { required: true })}
              className="form-select"
            >
              <option value="">Tipo de ram</option>

              <option value={equip.ram_type} selected>
                {" "}
                {equip.ram_type_name}
              </option>
              {}
            </select>
          </div>
          <div className=" col-6 col-sm-6 col-md-3">
            <label htmlFor="">Tipo de disco duro</label>
            <select
              {...register("hard_type", { required: true })}
              id=""
              className="form-select"
            >
              <option value="">Selecciona el tipo...</option>
              <option value={equip.hard_type} selected>
                {" "}
                {equip.hard_type_name}
              </option>
            </select>
          </div>
          {/* Sexta fila */}
          <div className="col-md-3">
            <label htmlFor="">Procesador</label>
            <input
              type="text"
              {...register("proccesor", { required: true })}
              id=""
              className="form-control"
              placeholder="Nombre de procesador"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="">Sistema operativo</label>
            <input
              type="text"
              {...register("system", { required: true })}
              id=""
              className="form-control"
              placeholder="Nombre del sistema operativo"
            />
          </div>
          {/* Septima fila */}
          <div className="col-md-2">
            <label htmlFor="">Estado equipo</label>

            <select
              name=""
              id=""
              className="form-select"
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
              className="form-control"
              placeholder="Antivirus"
            />
          </div>

          {/* Boton de envio */}
          <div className="col-md-6">
            <button className=" btn btn-primary text-center my-3">
              Editar
              {/* <img src={add} alt="" style={{ marginLeft: "10px" }} /> */}
            </button>
            <Link className="btn btn-success mx-3 " to={"/"}>
              agregar evento
            </Link>
            <Link
              className="btn btn-danger"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                onDelete(params.id);
              }}
            >
              Eliminar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default View_equip;

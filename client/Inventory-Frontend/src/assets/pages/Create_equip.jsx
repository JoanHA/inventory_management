import "../css/create.css";
import add from "./../img/add.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Create_equip() {
  //Use form para obtener los datos del formulario
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  
  const url = "http://localhost:4000/";

  //Method to save the data un the DB
  const onSubmit = (values) => {
    console.log(values);
    axios.post(url+"api/equip",values).then(res =>{
      console.log(res.data.status)
      if (res.data.status == 204) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El equipo de registro exitosamente!',
          showConfirmButton: true,
          timer: 3000
        }).then(()=>{reset()})
        
      }
    })
  };
  const [marks, setMarks] = useState([]);
  const [type, setType] = useState([]);
  const [disk, SetDisk] = useState([]);
  const [ram, setRam] = useState([]);

  useEffect(() => {
    var marcas = [];
    var rams = [];
    var equipos = [];
    var discos = [];

    axios
      .get(url+"utils")
      .then((res) => {
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
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

  }, []);
  return (
    <div className="px-4">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            {errors.name?.type === "required" && (
              <p className="errorMsg">name is required.</p>
            )}
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
            />
          </div>

          <div className=" col-4 col-sm-4 col-md-4">
            <label htmlFor="">Marca</label>
            <select
              id=""
              {...register("mark", { required: true })}
              className="form-select"
            >
              <option value="">Selecciona una marca...</option>
           
              {marks.map((object) => (
                <option value={object[0]}>{object[1]}</option>
              ))}
            </select>
          </div>
          <div className=" col-4 col-sm-4col-md-4">
            <label htmlFor="">Tipo de equipo</label>
            <select
              name=""
              id=""
              className="form-select"
              {...register("equip_type", { required: true })}
            >
              <option value="">Selecciona el tipo...</option>
              {type.map((object) => (
                <option value={object[0]}>{object[1]}</option>
              ))}
            </select>
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
                <option value="GB">GB</option>
                <option value="TB">TB</option>
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
                <option value="GB">GB</option>
                <option value="TB">TB</option>
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
              <option value="">Selecciona el tipo...</option>
              {ram.map((object) => (
                <option value={object[0]}>{object[1]}</option>
              ))}
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
              {disk.map((object) => (
                <option value={object[0]}>{object[1]}</option>
              ))}
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
            <label htmlFor="">Almacenados</label>
            <input
              type="number"
              {...register("stock", { required: true })}
              id=""
              className="form-control"
              placeholder="0"
            />
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
              Agregar
              <img src={add} alt="" style={{ marginLeft: "10px" }} />
            </button>
            <Link className="btn btn-success mx-3 " to={"/equipments"}>
              Ver todo
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create_equip;

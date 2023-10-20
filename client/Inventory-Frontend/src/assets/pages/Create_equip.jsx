import "../css/create.css";
import add from"../../../public/img/add.svg"
function Create_equip() {
  return (
    <div className="px-4">
      <div className="row" id="Equip-row">
        {/* Primera fila */}
        <div className="col-12 col-sm-6  col-md-6 ">
          <label htmlFor=""> Nombre del equipo</label>
          <input type="text" name="name" id="" className="form-control" placeholder="Nombre del producto..." />
        </div>
        <div className=" col-12 col-sm-6 col-md-6">
          <label htmlFor=""> Responsable</label>
          <input type="text" name="reference" id="" className="form-control" placeholder="Referencia..." />
        </div>
        {/* Segunda fila */}
        <div className=" col-6 col-sm-6 col-md-6">
          <label htmlFor=""> Modelo</label>
          <input type="text" name="model" id="" className="form-control" placeholder="Modelo..." />
        </div>
        <div className=" col-6 col-sm-6 col-md-6">
          <label htmlFor=""> Oficina</label>
          <input type="text" name="office" id="" className="form-control" placeholder="Oficina..." />
        </div>
        {/* Tercera fila */}
        <div className="col-md-12">
          <label htmlFor="">Descripcion</label>
          <textarea
            name="description"
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
          <input type="text" name="serial" id="" className="form-control" placeholder="Código de serie" />
        </div>

        <div className=" col-4 col-sm-4 col-md-4">
          <label htmlFor="">Marca</label>
          <select name="equipment_type" id="" className="form-select">
            <option value="">Selecciona una marca...</option>
          </select>
        </div>
        <div className=" col-4 col-sm-4col-md-4">
          <label htmlFor="">Tipo de equipo</label>
          <select name="" id="" className="form-select">
            <option value="">Selecciona el tipo...</option>
          </select>
        </div>
        {/* Quinta fila */}
        <div className="col-6 col-sm-6 col-md-3 ">
          <label htmlFor="">Cantidad de ram</label>
          <div className="d-flex align-item-center justify-content-center">
            <input type="number" name="ram" id="" className="form-control GB-TB" placeholder="0" />
            <select
              name=""
              id=""
              className="form-select md-3"
              style={{ width: "80px" }}
            >
              <option value="">GB</option>
              <option value="">TB</option>
            </select>
          </div>
        </div>

        <div className=" col-6  col-sm-6 col-md-3 ">
          <label htmlFor="">Cantidad de disco duro</label>
          <div className="d-flex justify-content-center">
            <input type="number" name="hard_disk" id="" className="form-control"  placeholder="0"/>
            <select
              name=""
              id=""
              className="form-select md-3 GB-TB"
              style={{ width: "80px" }}
            >
              <option value="">GB</option>
              <option value="">TB</option>
            </select>
          </div>
        </div>
        <div className=" col-6 col-sm-6 col-md-3">
          <label htmlFor="">Tipo de ram</label>
          <select name="ram_type " id="" className="form-select">
            <option value="">Tipo de ram</option>
          </select>
        </div>
        <div className=" col-6 col-sm-6 col-md-3">
          <label htmlFor="">Tipo de disco duro</label>
          <select name="hard_type" id="" className="form-select">
            <option value="">Tipo disco duro</option>
          </select>
        </div>
        {/* Sexta fila */}
        <div className="col-md-6">
          <label htmlFor="">Procesador</label>
          <input type="text" name="proccesor" id="" className="form-control" placeholder="Nombre de procesador" />
        </div>
        <div className="col-md-6">
          <label htmlFor="">Sistema operativo</label>
          <input type="text" name="system" id="" className="form-control"  placeholder="Nombre del sistema operativo"/>
        </div>
        {/* Septima fila */}
        <div className="col-md-2">
          <label htmlFor="">Cantidad almacenada</label>
          <input type="number" name="stock" id="" className="form-control"  placeholder="0"/>
        </div>
        <div className="col-md-5">
          <label htmlFor="">Antivirus</label>
          <input type="number" name="antivirus" id="" className="form-control"  placeholder="Antivirus"/>
        </div>
        <div className="col-md-5">
          <label htmlFor="">Mantenimiento</label>
          <select name="maintenance" id="" className="form-select">
            <option>Ya fue realizado?</option>
            <option value="">Si</option>
            <option value="">No</option>
          </select>
        </div>
        {/* Boton de envio */}
        <div className="col-md-6">
          <button className=" btn btn-primary text-center" style={{ marginTop: "10px" }}>
            Agregar
            <img src={add} alt=""  style={{marginLeft:"10px"}}/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create_equip;

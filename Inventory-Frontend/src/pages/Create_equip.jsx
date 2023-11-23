import "../assets/css/create.css";

import DevicesForm from "../components/DevicesForm";

function Create_equip() {

  // };
  return (
    <>
      {/* <div>
        {" "}
        {parametro && (
          <Add param={parametro[0]} val={parametro[1]} OnSaving={handleSave} />
        )}
      </div>
      <Masive></Masive> */}
      <div className="event_header">Registrar equipo</div>
      <DevicesForm/>

      {/* <div className="px-4 py-3">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="row" id="Equip-row">
            {/* Primera fila 
            <div className="col-12 col-sm-6  col-md-6 ">
              <label htmlFor=""> Nombre del equipo</label>
              <input
                type="text"
                {...register("name", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Nombre del producto..."
              />
              {errors.name?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
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
              {errors.user?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            {/* Segunda fila 
            <div className=" col-6 col-sm-6 col-md-6">
              <label htmlFor=""> Modelo</label>
              <input
                type="text"
                {...register("model", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Modelo..."
              />
              {errors.model?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className=" col-6 col-sm-6 col-md-6">
              <label htmlFor=""> Oficina</label>
              <input
                type="text"
                {...register("office", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Oficina..."
              />{" "}
              {errors.office?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            {/* Tercera fila 
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
              {errors.description?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>
            {/* cuarta fila 
            <div className=" col-12 col-sm-6 col-md-4">
              <label htmlFor="">Serial</label>
              <input
                type="text"
                {...register("serial", { required: true })}
                id=""
                className="form-control form-control-sm"
                placeholder="Código de serie"
              />
              {errors.serial?.type === "required" && (
                <p className="errorMsg" style={{ margin: "0px" }}>
                  Este campo es requerido
                </p>
              )}
            </div>

            <div className=" col-12 col-sm-6 col-md-4">
              <label htmlFor="">Marca</label>
              <div className="d-flex flex-row">
                <select
                  id=""
                  {...register("mark")}
                  className="form-select form-select-sm"
                 style={{maxHeight:"40px",overflowY:"auto"}}
                 
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
                  className="btn btn-secondary addBtn"
                  onClick={() => {
                    openView("Marca", "201");
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className=" col-12 col-sm-4 col-md-4">
              <label htmlFor="">Tipo de equipo</label>
              <div className="d-flex flex-row">
                <select
                  name=""
                  id=""
                  className="form-select form-select-sm"
                  {...register("equip_type")}
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
                  className="btn btn-secondary addBtn"
                  onClick={() => {
                    openView("Tipo de equipo", "208");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Quinta fila 
            <div className="col-12 col-sm-6 col-md-3 ">
              <label htmlFor="">Cantidad de ram</label>
              <div className="d-flex align-item-center justify-content-center">
                <input
                  type="number"
                  {...register("ram")}
                  id=""
                  className="form-control GB-TB"
                  placeholder="0"
                />
                <select
                  name=""
                  id=""
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
                  id=""
                  className="form-control"
                  placeholder="0"
                />
                <select
                  name=""
                  id=""
                  className="form-select form-select-sm md-3 GB-TB"
                  style={{ width: "80px" }}
                  {...register("formatDisk")}
                >
                  <option value="GB">GB</option>
                  <option value="TB">TB</option>
                </select>
              </div>
            </div>
            <div className=" col-12 col-sm-6 col-md-3">
              <label htmlFor="">Tipo de ram</label>
              <div className="d-flex flex-row">
                <select
                  id=""
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
                  className="btn btn-secondary addBtn"
                  onClick={() => {
                    openView("Tipo de ram", "204");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className=" col-12 col-sm-6 col-md-3">
              <label htmlFor="">Tipo de disco duro</label>
              <div className="d-flex flex-row">
                <select
                  {...register("hard_type")}
                  id=""
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
                  className="btn btn-secondary btn-sm   d-flex align-items-center    addBtn "
                  onClick={() => {
                    openView("Tipo de disco duro", "203");
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Sexta fila 
            <div className="col-md-3">
              <label htmlFor="">Procesador</label>
              <input
                type="text"
                {...register("proccesor")}
                id=""
                className="form-control"
                placeholder="Nombre de procesador"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="">Sistema operativo</label>
              <input
                type="text"
                {...register("system")}
                id=""
                className="form-control"
                placeholder="Nombre del sistema operativo"
              />
            </div>
            {/* Septima fila *
            <div className="col-md-2">
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
            <div className="col-md-3 ">
              <label htmlFor="">Antivirus</label>
              <input
                type="text"
                name="antivirus"
                {...register("antivirus")}
                id=""
                className="form-control"
                placeholder="Antivirus"
              />
            </div>

            {/* Boton de envio 
            <div className="col-md-6">
              <button
                className=" btn btn-primary text-center my-3"
                disabled={user.rol == 272 ? true : false}
              >
                Agregar
                <img src={add} alt="" style={{ marginLeft: "10px" }} />
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
      </div> */}
    </>
  );
}

export default Create_equip;

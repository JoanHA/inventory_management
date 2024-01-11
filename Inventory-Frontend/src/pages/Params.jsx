import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GetParams } from "../lib/saveParams";
import Volver from "../components/Volver";
import { Link, useAsyncError } from "react-router-dom";
import ManageParam from "../components/ManageParam";
import Add from "../components/Add";
import { MdAddTask } from "react-icons/md";

function Params() {
  const [mark, setMark] = useState([]);
  const [equip_type, setEquip_type] = useState([]);
  const [ram, setRam] = useState([]);
  const [disk_type, setDisk_type] = useState([]);
  const [event_type, setEvent_type] = useState([]);
  //Valores para agregar
  const [addData, setAddData] = useState([]);

  //Valores para editar
  const [param, setParam] = useState("");
  const [id, setId] = useState("");
  const [val, setVal] = useState("");
  const get = async () => {
    const res = await GetParams();
    const datos = res.data;
    const marcas = [];
    const tipo_equipo = [];
    const tipo_ram = [];
    const tipo_disco = [];
    const tipo_evento = [];
    datos.map((e) => {
      switch (e.paramtype_id) {
        case 201: //Marcas
          if (e.param_state == 1) {
            marcas.push(e);
          }

          break;

        case 203: //Tipo de disco duro
          if (e.param_state == 1) {
            tipo_disco.push(e);
          }

          break;

        case 204: //Tipo de ram
          if (e.param_state == 1) {
            tipo_ram.push(e);
          }

          break;

        case 208: //Tipo de equipo
          if (e.param_state == 1) {
            tipo_equipo.push(e);
          }

          break;
        case 200: //Tipo de evento
          if (e.param_state == 1) {
            tipo_evento.push(e);
          }

          break;
        default:
          break;
      }
    });
    setMark(marcas);
    setEquip_type(tipo_equipo);
    setRam(tipo_ram);
    setDisk_type(tipo_disco);
    setEvent_type(tipo_evento)
  };
  useEffect(() => {
    get();
    document.querySelector("#addModal").classList.add("inactive");
  }, []);
  const handleSave = (name, id) => {
    setAddData([name, id]);
    document.querySelector("#addModal").classList.remove("inactive");
  };
  const editParam = (name, id, val) => {
    setParam(name);
    setId(id);

    setVal(val);
    document.getElementById("addParam").classList.remove("d-none");
  };
  const Button = ({ name, id }) => {
    return (
      <>
        <button
          className="btn btn-dark px-2 py-2 my-1"
          style={{ maxHeight: "44px" }}
          onClick={() => {
            handleSave(name, id);
          }}
        >
          <MdAddTask size={"1.5rem"} />
        </button>
      </>
    );
  };
  const refresh = async () => {
    document.getElementById("addParam").classList.add("d-none")
    await get();
    
  };
  return (
    <div>
      <Helmet>
        <title>Parametros</title>
      </Helmet>
      <ManageParam name={param} id={id} value={val} callback={refresh}/>
      <Add param={addData[0]} val={addData[1]} OnSaving={refresh} />
      <div className="event_header d-flex flex-align-items justify-content-between">
        Administrar Parametros <Volver />
      </div>
      <div className="px-4 py-2">
        <div className="text-center my-0 mt-1">
          <h4 className="my-0">
            {" "}
            <strong>Selecciona uno para editar o borrar</strong>
          </h4>
        </div>
        <div>
          <div className="d-flex align-items-center gap-1">
            <label className="event_header my-2 ">
              <strong>Marcas</strong>
            </label>
            <div className="">
              <Button name={"Marcas"} id={"201"} />
            </div>
          </div>
          <div className="text-dark d-flex flex-wrap gap-2 px-3">
            {mark &&
              mark.map((e) => (
                <>
                  <Link
                    className=""
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      editParam("Marca", e.id, e.name);
                    }}
                  >
                    <div className="card text-dark bg-light mb-3 py-2 px-3 align-items-center rounded justify-content-evenly">
                      {e.name}
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-1">
            <label className="event_header my-2">
              <strong>Tipo de equipo</strong>
            </label>
            <div className="">
              <Button name={"Tipo de equipo"} id={"208"} />
            </div>
          </div>
          <div className="text-dark d-flex  flex-wrap  gap-2 px-3">
            {equip_type &&
              equip_type.map((e) => (
                <>
                  <Link
                    key={e.id}
                    className=" "
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      editParam("Tipo de equipo", e.id, e.name);
                    }}
                  >
                    <div className="card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly">
                      {e.name}
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-1">
            <label className="event_header my-2">
              <strong>Tipo de Ram</strong>
            </label>
            <div className="">
              <Button name={"Tipo de ram"} id={"204"} />
            </div>
          </div>
          <div className="text-dark d-flex flex-wrap  gap-2 px-3">
            {ram &&
              ram.map((e) => (
                <>
                  <Link
                    key={e.id}
                    className=""
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      editParam("Tipo de ram", e.id, e.name);
                    }}
                  >
                    <div className="card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly">
                      {e.name}
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-1">
            <label className="event_header my-2">
              <strong>Tipo de disco duro</strong>
            </label>
            <div className="">
              <Button name={"Tipo de disco duro"} id={"203"} />
            </div>
          </div>
          <div className="text-dark d-flex flex-wrap  gap-2 px-3">
            {disk_type &&
              disk_type.map((e) => (
                <>
                  <Link
                    key={e.id}
                    className=" "
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      editParam("Tipo de disco duro", e.id, e.name);
                    }}
                  >
                    <div className="card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly">
                      {e.name}
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>

        <div>
          <div className="d-flex align-items-center  gap-1">
            <label className="event_header my-2">
              <strong>Tipo de evento</strong>
            </label>
            <div className="">
              <Button name={"Tipo de evento"} id={"200"} />
            </div>
          </div>
          <div className="text-dark d-flex flex-wrap gap-2 px-3">
            {event_type &&
              event_type.map((e) => (
                <>
                  <Link
                    key={e.id}
                    className=" "
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      editParam("Tipo de disco duro", e.id, e.name);
                    }}
                  >
                    <div className="card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly">
                      {e.name}
                    </div>
                  </Link>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Params;

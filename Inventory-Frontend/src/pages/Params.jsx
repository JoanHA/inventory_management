import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GetParams } from "../lib/saveParams";
import Volver from "../components/Volver";
import { Link, useAsyncError } from "react-router-dom";
import ManageParam from "../components/ManageParam";
import Add from "../components/Add";

function Params() {
  const [mark, setMark] = useState([]);
  const [equip_type, setEquip_type] = useState([]);
  const [ram, setRam] = useState([]);
  const [disk_type, setDisk_type] = useState([]);
  //Valores para agregar
  const [param_name, setParam_name] = useState("");
  const [param_id, setParam_id] = useState(1);

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
    datos.map((e) => {
        console.log(e)
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
        default:
          break;
      }
    });
    setMark(marcas);
    setEquip_type(tipo_equipo);
    setRam(tipo_ram);
    setDisk_type(tipo_disco);
  };
  useEffect(() => {
    get();
  }, []);
  const handleSave = () => {};
  const editParam = (name, id, val) => {
    setParam(name);
    setId(id);

    setVal(val);
    document.getElementById("addParam").classList.remove("d-none");
  };
  return (
    <div>
      <ManageParam name={param} id={id} value={val} />
      <div className="d-none" id="addContainer">
        <Add param={param_name} val={param_id} OnSaving={handleSave} />
      </div>

      <div className="event_header d-flex flex-align-items justify-content-between">
        Administrar Parametros <Volver />
      </div>
      <div className="px-4 py-2">
        <div className="text-center my-0 mt-1">
          <h4 className="my-0"> <strong>Selecciona uno para editar o borrar</strong></h4>
        </div>
        <div>
          <div>
            <label className="event_header my-2 ">
              <strong>Marcas</strong>
            </label>
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
          <div>
            <label className="event_header my-2">
              <strong>Tipo de equipo</strong>
            </label>
          </div>
          <div className="text-dark d-flex gap-2 px-3">
            {equip_type &&
              equip_type.map((e) => (
                <>
                  <Link
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
          <div>
            <label className="event_header my-2">
              <strong>Tipo de Ram</strong>
            </label>
          </div>
          <div className="text-dark d-flex gap-2 px-3">
            {ram &&
              ram.map((e) => (
                <>
                  <Link
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
          <div>
            <label className="event_header my-2">
              <strong>Tipo de disco duro</strong>
            </label>
          </div>
          <div className="text-dark d-flex gap-2 px-3">
            {disk_type &&
              disk_type.map((e) => (
                <>
                  <Link
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

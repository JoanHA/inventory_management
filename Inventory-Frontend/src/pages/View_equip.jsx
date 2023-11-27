/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "../assets/css/create.css";
import { Link, useLocation, useParams } from "react-router-dom";

import DevicesForm from "../components/DevicesForm.jsx";
function View_equip() {

  return (
    <>
      <div className="event_header d-flex justify-content-between my-0 align-items-center">
        Editar equipo
        <button className="btn btn-sm btn-secondary" onClick={()=>{window.history.back()}}>
          Volver
        </button>
      </div>
      <div>
        <DevicesForm/>
      </div>
     
    </>
  );
}

export default View_equip;

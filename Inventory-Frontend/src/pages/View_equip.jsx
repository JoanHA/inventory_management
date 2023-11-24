/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "../assets/css/create.css";
import { Link, useParams } from "react-router-dom";

import DevicesForm from "../components/DevicesForm.jsx";
function View_equip() {
  
  return (
    <>
      <div className="event_header d-flex justify-content-between">
        Editar equipo{" "}
        <Link to={"/equipments"} className="btn btn-sm btn-secondary">
          Volver
        </Link>
      </div>
      <div>
        <DevicesForm/>
      </div>
     
    </>
  );
}

export default View_equip;

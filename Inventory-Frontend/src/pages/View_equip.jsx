/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "../assets/css/create.css";
import { Link, useLocation, useParams } from "react-router-dom";
import Volver from "../components/Volver.jsx";
import DevicesForm from "../components/DevicesForm.jsx";
import { Helmet } from "react-helmet";

function View_equip() {

  return (
    <>
     <Helmet>
          <title>Editar  equipo</title>
        </Helmet>
      <div className="event_header d-flex justify-content-between my-0 align-items-center">
        Editar equipo
        <Volver />
      </div>
      <div>
        <DevicesForm/>
      </div>
     
    </>
  );
}

export default View_equip;

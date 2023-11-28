import "../assets/css/create.css";
import { Helmet } from "react-helmet";

import DevicesForm from "../components/DevicesForm";

function Create_equip() {


  return (
    <>
     <Helmet>
          <title>Registrar equipos</title>
        </Helmet>
      <div className="event_header">Registrar equipo</div>
      <DevicesForm/>

    </>
  );
}

export default Create_equip;

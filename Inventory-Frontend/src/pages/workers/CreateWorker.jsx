/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import Form from "../../components/Form"
import { Helmet } from "react-helmet";

function CreateWorker() {

 return(
  <div>
     <div className="event_header d-flex justify-content-between p">
        Crear colaboradores
        <Helmet>
          <title>Crear colaborador</title>
        </Helmet>
      </div>
      <div>
        <Form/>
        
      </div>
  </div>
  )
}

export default CreateWorker
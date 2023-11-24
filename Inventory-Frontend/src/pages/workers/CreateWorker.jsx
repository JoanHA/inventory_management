/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import Form from "../../components/Form"

function CreateWorker() {

 return(
  <div>
     <div className="event_header d-flex justify-content-between p">
        Crear colaboradores
        {/* <Link>
          <button className="btn btn-secondary btn-sm my-0">Volver</button>
        </Link> */}
      </div>
      <div>
        <Form/>
        
      </div>
  </div>
  )
}

export default CreateWorker
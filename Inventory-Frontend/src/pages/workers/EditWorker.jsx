import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../../components/Form'
function EditWorker() {
  return (
    <div>
     <div className="event_header d-flex justify-content-between p">
        Editar colaboradores
        <Link>
          <button className="btn btn-secondary btn-sm my-0">Volver</button>
        </Link>
      </div>
      <div>
        <Form/>
        
      </div>
    </div>
  )
}

export default EditWorker
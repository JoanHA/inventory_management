import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../../components/Form'
import Volver from '../../components/Volver'
import { Helmet } from 'react-helmet'
function EditWorker() {
  return (
    <div>
       <Helmet>
          <title>Editar colaborador</title>
        </Helmet>
     <div className="event_header d-flex justify-content-between p">
        Editar colaboradores
        <Volver />
      </div>
      <div>
        <Form/>
        
      </div>
    </div>
  )
}

export default EditWorker
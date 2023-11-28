import React from 'react'

function Volver() {
  return (
    <div>
        <button className="btn btn-secondary btn-sm" onClick={()=>{
            window.history.back()
        }}> Volver</button>
    </div>
  )
}

export default Volver
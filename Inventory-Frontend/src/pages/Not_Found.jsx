import React, { useEffect } from 'react'
import error from "../assets/img/Error404.jpg"
function Not_Found() {
    
useEffect(()=>{
    document.getElementById("sidebarContainer").style.display = "none"
    document.getElementById("navbar").style.display = "none"
},[])

  return (
    <div className=' w-100 h-100 d-flex align-items-center justify-content-center'>
        <div>
            <img src={error} alt="" className='px-4 ' width={600}  />
            <div className='text-center'><h2> <strong>Oops, No Deberias Estar Aqui...</strong></h2></div>
        </div>

    </div>
  )
}

export default Not_Found
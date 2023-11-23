import React from "react";
import "../assets/css/add.css";
import { useForm } from "react-hook-form";
import { saveMasiveWorkers } from "../api/workers.controllers";

function MasiveWorkers() {
   //function for closing the modal
   const close = () => {
    document.getElementById("modalPage").style.display = "None";
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file",data.file[0])
    try {
      console.log("Carga masiva")
           const res = await   saveMasiveWorkers(formData)
            
          if(res.status ==200){
            swal.fire("Datos guardados","","success").then(()=>{
              reset();
              close();

            })
          }  else{
            swal.fire("Lo sentimos algo salio mal","","error").then(()=>{
              reset();
              close();

            })

          }
    } catch (error) {
      console.log(error)
      
    }

  };

  return (
    
    <div className="modalPage" id="modalPage">
      <div className="card w-50 mx-auto px-4 py-4 rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mx-auto py-2">
            <div className="text-center">
              <h1>Carga Masiva de datos</h1>
              <label htmlFor="" className="mb-3">
                Selecciona el archivo con los datos a subir...
              </label>
              <div className=" text-center"></div>
            </div>
            <div className="text-center d-flex flex-column mb-2 align-items-center">
            {errors.file?.type == "required" && (<p className="errorMsg mb-0">Este campo no puede ir vacio</p>)}
              <input type="file" className="form-control mb-3"  {...register("file",{required:true})}/>
           
              <p className="errorMsg align-self-center">
                Recuerda que debe ser un archivo excel (.xls)
              </p>
            </div>

            <div className="form-group text-center ">
              <button className="btn btn-success mt-1">Enviar</button>
              <button
                className="btn btn-danger mx-1 mt-1"
                type="button"
                onClick={close}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MasiveWorkers
import React, { useEffect, useState } from "react";
import "../css/add.css";
import { useForm } from "react-hook-form";

function Add(props) {
  const [param, setParam] = useState();
  const onSubmit = (values) => {
    console.log(values);
    console.log({ props });
    useEffect(() => {
      console.log(props.param);
    }, []);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="back w-100 vh-100" id="addModal">
      <div className="card mx-auto my-auto d-flex justify-content-center align-items-center  formContainer">
        <form
          onSubmit={handleSubmit(onsubmit)}
          action=""
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex flex-column gap-5">
            <div className="d-flex flex-row gap-3 justify-content-center flex-wrap">
              <div className="d-flex flex-column align-items-center gap-1 flex-wrap">
                <label htmlFor="">  Parametro </label>
                <input
                  type="text"
                  placeholder="parametro"
                  value={props.param}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="d-flex flex-column align-items-center gap-1 flex-wrap">
                <label htmlFor="">Valor</label>
                <input
                  type="text"
                  placeholder="Valor"
                  className="form-control"
                
                  {...register("value", { required: true })}
                />
                {errors.value?.type === "required" && (
                  <p className="errorMsg" style={{ margin: "0px" }}>
                    Este campo es requerido.
                  </p>
                )}
              </div>
            </div>

            <div className="d-flex gap-2 align-items-center justify-content-center">
              <button className="btn btn-success">Guardar</button>
              <button type="button" className="btn btn-danger" onClick={()=>{
                document.querySelector("#addModal").classList.add("inactive");
              }}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;

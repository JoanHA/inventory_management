import React, { useEffect, useState } from "react";
import "../assets/css/add.css";
import {  useForm } from "react-hook-form";

import { saveParam } from "../assets/lib/saveParams";
function Add(props) {
  const [param, setParam] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    setParam(props.param);
    setId(props.val);
    reset({
      paramType_Id: props.val,
    });
  }, [props]);

  const onSubmit = (values) => {
     saveParam(values);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <div className="back w-100 vh-100" id="addModal">
      <div className="card mx-auto  d-flex rounded justify-content-center align-items-center  formContainer">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex flex-column gap-5 px-3 py-1">
            <div className="d-flex flex-row gap-3 justify-content-center flex-wrap">
              <div className="d-flex flex-column align-items-center gap-1 flex-wrap">
                <label htmlFor=""> Parametro </label>
                <input
                  type="text"
                  placeholder="parametro"
                  value={param}
                  className="form-control"
                  readOnly
                />

                <input
                  id="inputHidden"
                  readOnly
                  type="text"
                  value={id}
                  {...register("paramType_Id")}
                />
              </div>
              <div className="d-flex flex-column align-items-center gap-1 flex-wrap">
                <label htmlFor="">Valor</label>
                <input
                  type="text"
                  id="valParam"
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

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  document.querySelector("#addModal").classList.add("inactive");
                  reset({
                    value: "",
                  });
                }}
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

export default Add;

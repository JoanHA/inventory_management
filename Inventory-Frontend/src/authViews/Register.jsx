import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/grupo-carval-Logo-Bioart.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { URI } from "../../config";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    axios.post(URI+"login",values)
  };
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center px-5">
        <div
          id="form-container"
          className=" gap-3 py-3 px-3 mx-auto mt-5"
          style={{ width: "40%" }}
        >
          <div className="d-flex justify-content-center flex-column align-items-center">
            <div className="signUpHeader">
              <h4>Registrarse</h4>
            </div>
            <div
              className="bg-light   d-flex align-items-center px-3"
              style={{ height: "80px", borderRadius: "200px" }}
            >
              <img src={logo} alt="" width={200} />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <form className="w-75" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-column gap-2 justify-content-center ">
                <div className="form-floating rounded ">
                  <input
                    type="email"
                    className="form-control form-control-sm inputs"
                    id="floatingInput"
                    style={{ height: "10px" }}
                   
                    {...register("email", { required: true })}
                  />
                  <label htmlFor="floatingInput">Correo </label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control  form-control-sm inputs"
                    id="floatingUser"
                  
                    {...register("username", { required: true })}
                  />
                  <label htmlFor="floatingUser">Usuario</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control form-control-sm inputs"
                    id="floatingPassword"
                 
                    {...register("password", { required: true })}
                  />
                  <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <div className="d-flex justify-content-center w-100 mt-3">
                  <button className="btn btn-success w-75">Registrarse</button>
                </div>
                <div className="align-self-center ">
                  <Link to={"/login"} className="initLink">
                    ¿Ya tienes cuenta?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

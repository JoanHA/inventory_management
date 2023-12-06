import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/grupo-carval-Logo-Bioart.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, Errores } = useAuth();

  const onSubmit = async (values) => {
    const signed = await signup(values);
   
    if (Errores == null) {
      if (signed.data.status == 200) {
        Swal.fire({
          position: "center",
          showClass: {
            popup: "Swal animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          icon: "success",
          title: "Usuario creado!",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/");
          location.reload();
        });
      }
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center px-5">
        <div
          id="form-container"
          className=" gap-3 py-3 px-3  mt-4"
          style={{ width: "320px", maxWidth: "25rem" }}
        >
          <div className="d-flex justify-content-center flex-column align-items-center">
            {/* <div className="signUpHeader">
              <h4>Registrarse</h4>
            </div> */}
            <div
              className="  d-flex align-items-center px-3"
              style={{ height: "80px", borderRadius: "200px" }}
            >
              <img src={logo} alt="" width={200} />
            </div>
          </div>
          <div className="">
            <form className="w-100 mx-auto d-flex justify-content-center" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-column gap-2 justify-content-center w-75">
                {Errores &&
                  Errores.map((error) => (
                    <div key={0} className="spanError">
                      {error}
                    </div>
                  ))}
                <div className="form-floating rounded ">
                  <input
                    type="email"
                    className="form-control form-control-sm inputs"
                    id="floatingInput"
                    style={{ height: "10px" }}
                    {...register("email", { required: true })}
                  />
                  {errors.email && errors.email.type === "required" ? (
                    <div className="errorMsg">Este campo es requerido</div>
                  ) : null}
                  <label htmlFor="floatingInput">Correo </label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control  form-control-sm inputs"
                    id="floatingUser"
                    {...register("username", { required: true, maxLength: 10 })}
                  />
                  {errors.username && errors.username.type === "maxLength" ? (
                    <div className="errorMsg">
                      El usuario no puede tener más de 10 caracteres
                    </div>
                  ) : null}
                  {errors.username && errors.username.type === "required" ? (
                    <div className="errorMsg">Este campo es requerido</div>
                  ) : null}

                  <label htmlFor="floatingUser">Usuario</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control form-control-sm inputs"
                    id="floatingPassword"
                    {...register("password", { required: true, minLength: 8 })}
                  />
                  {errors.password && errors.password.type === "required" ? (
                    <div className="errorMsg">Este campo es requerido</div>
                  ) : null}
                  {errors.password?.type === "minLength" && (
                    <p className="errorMsg">
                      La contraseña debe de tener minimo 8 carácteres
                    </p>
                  )}
                  <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <div className="d-flex justify-content-center w-100 mt-3">
                  <button className="btn btn-success w-100">Registrarse</button>
                </div>
             
              </div>
            </form>
            <div className=" d-flex mt-2 justify-content-center ">
                  <label htmlFor="" className="initLabel">
                    ¿Ya tienes cuenta?
                  </label>
                  <Link to={"/login"} className="initLink">
                    Inicia sesión
                  </Link>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

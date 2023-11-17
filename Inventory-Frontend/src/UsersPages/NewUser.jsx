import React, { useEffect, useState } from "react";
import { CreateUser } from "../api/user.controller";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
function NewUser() {
  const [Errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const time = setTimeout(() => {
      setErrors([]);
    }, 5000);
    return () => clearTimeout(time);
  }, [Errors]);
  const onSubmit = async (data) => {
    try {
      const res = await CreateUser(data);

      console.log(res);
      if (res.status == 200) {
        swal.fire("Usuario creado con exito!", "", "success").then(() => {
          navigate("/userManagement");
        });
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const changeEye  = ()=>{
    document.getElementById("eye-outline").classList.toggle("inactive")
    document.getElementById("eye-line").classList.toggle("inactive")
    document.getElementById("input-pass").type = document.getElementById("input-pass").type  == "text"? "password":"text"
    
  }

  return (
    <div>
      <div className="title">
        <div className="event_header d-flex justify-content-between">
          <span>
            <> Administración de usuarios</>
          </span>
          <Link
            to={"/userManagement"}
            className="btn btn-secondary mt-0 btn-sm"
          >
            Volver
          </Link>
        </div>
      </div>
      <div className="py-2">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-50 mx-auto my-auto">
              <div className="form-group">
                <h1>Crear nuevo usuario </h1>
                {Errors &&
                  Errors.map((error) => (
                    <div key={0} className="spanError">
                      <div></div>
                      {error}
                    </div>
                  ))}
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  {...register("username", { required: true,maxLength:8 })}
                />
                {errors.username?.type == "required" && (
                  <p className="errorMsg mb-0">Este campo es requerido</p>
                )}
                 {errors.username && errors.username.type === "maxLength" ? (
                    <div className="errorMsg">
                      El nombre de usuario no puede tener más de 8 caracteres
                    </div>
                 ):""}
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type == "required" && (
                  <p className="errorMsg mb-0">Este campo es requerido</p>
                )}
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select className="form-select" {...register("rol")}>
                  <option value="272">Visitante</option>
                  <option value="270">Administrador</option>
                  <option value="273">Operador</option>
                </select>
                {errors.rol?.type == "required" && (
                  <p className="errorMsg mb-0">Este campo es requerido</p>
                )}
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select
                  className="form-select"
                  {...register("status", { required: true })}
                >
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                  <option value="3">Eliminado</option>
                </select>
                {errors.status?.type == "required" && (
                  <p className="errorMsg mb-0">Este campo es requerido</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="">Contraseña</label>
                <div className="d-flex flex-row">
                  <input
                  id="input-pass"
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    className="form-control form-control-sm rounded "
                    placeholder="Contraseña..."
                  
                  />
                  <span
                    className="input-group-text fa fa-eye-slash"
                    id="basic-addon1"
                  > 
                    <a onClick={changeEye} id="eye-line">
                      <AiFillEyeInvisible size={"2rem"} className="eye"/>
                    </a>

                    <a   onClick={changeEye} className="inactive"   id="eye-outline">
                      <AiOutlineEye  size={"2rem"} className="eye"/>
                    </a>
                  </span>
                </div>

                {errors.password?.type == "required" && (
                  <p className="errorMsg mb-0">Este campo es requerido</p>
                )}

                {errors.password?.type == "minLength" && (
                  <p className="errorMsg mb-0">
                    La contraseña debe de tener minimo 8 carácteres
                  </p>
                )}
              </div>
              <div>
                <button className="btn btn-success my-2">Crear usuario</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewUser;

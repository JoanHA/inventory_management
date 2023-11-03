import React, { useEffect, useState } from "react";
import "../assets/css/add.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { saveMasive } from "../api/events.controller";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword, getOne } from "../api/user.controller";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
function ChangePassword() {
  //function for closing the modal
  const close = () => {
    document.getElementById("modalPage").style.display = "None";
  };

  const params = useParams();
  //Register user
  const { user, PasswordChanger, Errores, logOut } = useAuth();
  const [rol, setRol] = useState(null);
  const navigate = useNavigate();
  //Form handler
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //submit Handler
  const onSubmit = async (data) => {
    data.id = params.id;
    try {
      const res = await PasswordChanger(data);
      if (res == 200) {
        if (user.id == params.id) {
          swal
            .fire("Contraseña cambiada con exito!", "", "success")
            .then(() => {
              logOut();
            });
        } else {
          swal
            .fire("Contraseña cambiada con exito!", "", "success")
            .then(() => {
              navigate("/userManagement");
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getEdited = async () => {
      try {
        const res = await getOne(params.id);
        setRol(res.data.rol);
      } catch (error) {
        console.log(error);
      }
    };
    getEdited();
  }, []);
  const changeEye = (n) => {
   
    document.getElementById(`eye-line${n}`).classList.toggle("inactive");
    document.getElementById(`eye-outline${n}`).classList.toggle("inactive");
  

    document.getElementById(`input-pass${n}`).type = document.getElementById(`input-pass${n}`).type  == "text"? "password":"text"
  };

  return (
    <div className="modalPage" id="modalPage">
      <div className="card w-50 mx-auto px-4 py-4 rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mx-auto py-2">
            <div className="text-center">
              <h1>Cambiar contraseña</h1>
              {Errores &&
                Errores.map((error) => (
                  <div key={0} className="spanError">
                    <div></div>
                    {error}
                  </div>
                ))}
            </div>

            {rol == 271 ? (
              <div className="d-flex flex-column justify-content-center align-items-center gap-1">
                <div className="form-group  d-flex flex-column w-50">
                  <label htmlFor="">Contraseña actual</label>
                  <div className="d-flex flex-row">
                    <input
                    id="input-pass1"
                      type="password"
                      {...register("Password", { required: true })}
                      className="form-control form-control-sm rounded "
                      placeholder="Actual..."
                    ></input>

                    <span className="input-group-text " >
                      <a  onClick={()=>{changeEye("1")}}>
                        <AiOutlineEyeInvisible
                          size={"1.5rem"}
                          className="eye"
                          id="eye-outline1"
                        />
                        <AiOutlineEye
                          size={"1.5rem"}
                          style={{ display: "block" }}
                          className="eye inactive"
                          id="eye-line1"
                        />
                      </a>
                    </span>
                  </div>

                  {errors.password?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
                <div className="form-group d-flex flex-column w-50">
                  <label htmlFor="">Nueva contraseña</label>
                  <div className="d-flex flex-row">
                    <input
                          id="input-pass2"
                      type="password"
                      {...register("Newpassword", { required: true })}
                      className="form-control form-control-sm rounded "
                      placeholder="Nueva..."
                    />
                     <span className="input-group-text " >
                      <a  onClick={()=>{changeEye("2")}}>
                        <AiOutlineEyeInvisible
                          size={"1.5rem"}
                          className="eye"
                          id="eye-outline2"
                        />
                        <AiOutlineEye
                          size={"1.5rem"}
                          style={{ display: "block" }}
                          className="eye inactive"
                          id="eye-line2"
                        />
                      </a>
                    </span>
                  </div>

                  {errors.Newpassword?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
                <div className="form-group d-flex flex-column w-50">
                  <label htmlFor="">Confirma contraseña</label>
                  <div className="d-flex flex-row">
                    <input
                      type="password"
                      id="input-pass3"
                      {...register("Confirmpassword", { required: true })}
                      className="form-control form-control-sm rounded "
                      placeholder="Confirma nueva..."
                    />
                    <span className="input-group-text " >
                      <a  onClick={()=>{changeEye("3")}}>
                        <AiOutlineEyeInvisible
                          size={"1.5rem"}
                          className="eye"
                          id="eye-outline3"
                        />
                        <AiOutlineEye
                          size={"1.5rem"}
                          style={{ display: "block" }}
                          className="eye inactive"
                          id="eye-line3"
                        />
                      </a>
                    </span>
                  </div>

                  {errors.Confirmpassword?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center gap-1">
                <div className="form-group d-flex flex-column w-50">
                  <label htmlFor="">Nueva contraseña</label>
                  <div className="d-flex flex-row">
                  <input
                    type="password"
                    id="input-pass1"
                    {...register("Newpassword", { required: true })}
                    className="form-control form-control-sm rounded "
                    placeholder="Nueva ..."
                   
                  />
                  <span className="input-group-text " >
                      <a  onClick={()=>{changeEye("1")}}>
                        <AiOutlineEyeInvisible
                          size={"1.5rem"}
                          className="eye"
                          id="eye-outline1"
                        />
                        <AiOutlineEye
                          size={"1.5rem"}
                          style={{ display: "block" }}
                          className="eye inactive"
                          id="eye-line1"
                        />
                      </a>
                    </span>
                  </div>
                 
                  {errors.Newpassword?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
                <div className="form-group d-flex flex-column w-50">
                  Confirma contraseña
                  <div className="d-flex flex-row">
                  <input
                    type="password"
                    {...register("Confirmpassword", { required: true })}
                    className="form-control form-control-sm rounded "
                    placeholder="Confirma nueva..."
                    id="input-pass2"
                  />
                  <span className="input-group-text " >
                      <a  onClick={()=>{changeEye("2")}}>
                        <AiOutlineEyeInvisible
                          size={"1.5rem"}
                          className="eye"
                          id="eye-outline2"
                        />
                        <AiOutlineEye
                          size={"1.5rem"}
                          style={{ display: "block" }}
                          className="eye inactive"
                          id="eye-line2"
                        />
                      </a>
                    </span>
                  </div>
                 
                  {errors.Confirmpassword?.type == "required" && (
                    <p className="errorMsg mb-0">Este campo es requerido</p>
                  )}
                </div>
              </div>
            )}

            <div className="form-group text-center mt-2 ">
              <button className="btn btn-success mt-1">Confirmar</button>
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

export default ChangePassword;

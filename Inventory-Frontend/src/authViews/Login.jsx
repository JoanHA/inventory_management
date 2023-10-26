import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/grupo-carval-Logo-Bioart.png";
function Login() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center px-5">
        <div   id="form-container" className="  gap-3 py-3 px-3 mx-auto mt-4" style={{width:"40%"}}>
          <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="signUpHeader">
              <h4>Iniciar sesión</h4>
            </div>
            <div className="bg-light   d-flex align-items-center px-3" style={{height:"80px", borderRadius:"200px"}}>
              <img src={logo} alt="" width={200} />
            </div>
            
          </div>
          <div className="d-flex justify-content-center">
            <form action="" className="w-75">
              <div className="d-flex flex-column gap-2 justify-content-center ">
                <div className="form-floating rounded ">
                  <input
                    type="email"
                    className="form-control form-control-sm inputs"
                    id="floatingInput"
               
                  />
                  <label htmlFor="floatingInput">Correo </label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control form-control-sm inputs"
                    id="floatingPassword"
               
                  />
                  <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <div className="align-self-end ">
                  <Link className="initLink">Olvide mi contraseña</Link>
                </div>
                <div className="d-flex justify-content-center w-100">
                  <button className="btn btn-success w-75">Iniciar sesión</button>
                </div>
                <div  className="align-self-center ">
                  <Link to={"/register"} className="w-75  initLink"> No tengo cuenta</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

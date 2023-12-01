import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { URI } from "../../../config";
import axios from "axios";
import "./../../assets/css/recovery.css";
import { useForm } from "react-hook-form";
function RecoverCode() {
  const { otp, email } = useAuth();
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = React.useState(60);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function resendOTP() {
    if (disable) return;
    axios
      .post(`${URI}api/recover/send_recovery_email`, {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("Un nuevo codigo ha sido enviado a tu correo."))
      .then(() => setTimer(60))
      .catch(alert("Tuvimos un error, intenta mas tarde."));
  }

  const onSubmit = (data)=>{
    const verify = parseInt(`${data.p0}${data.p1}${data.p2}${data.p3}`)
    if (verify==otp) {
      swal.fire("Codigo verificado correctamente","","success").then(()=>{navigate("/reset")})
    }else{
      swal.fire("Error, el codigo no coincide","","error")
    }
  }


  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div>
      <div className="my-5 text-center rounded verficationForm mx-auto">
        <div className="text-center">
          <h2 style={{fontWeight:"bolder"}}>
            <strong>Verificación de email</strong>
          </h2>
          <p>Hemos enviado un correro a tu email {email && email}</p>
        </div>
        <form className="d-flex flex-column justify-content-center align-items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex gap-2">
            <div>
              <input
                maxLength={1}
                type="text"
                {...register("p0", { required: true })}
                className="form-control otpInput text-center"
              />
            </div>
            <div>
              <input
                maxLength={1}
                type="text"
                {...register("p1", { required: true })}
                className="form-control otpInput text-center"
              />
            </div>
            <div>
              <input
                maxLength={1}
                type="text"
                {...register("p2", { required: true })}
                className="form-control otpInput text-center"
              />
            </div>
            <div>
              <input
                maxLength={1}
                type="text"
                {...register("p3", { required: true })}
                className="form-control otpInput text-center"
              />
            </div>
          </div>
          <div className="w-100">
            <button className="btn btn-primary btn-block w-100">
              Verificar cuenta
            </button>
          </div>
        </form>

        <div className="d-flex flex-row gap-2 ">
          <p>No recibiste un correo?</p>{" "}
          <Link
            className="flex flex-row items-center"
            style={{
              color: disable ? "gray" : "blue",
              cursor: disable ? "none" : "pointer",
              textDecoration: "none",
            }}
            onClick={() => resendOTP()}
          >
            {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default RecoverCode;

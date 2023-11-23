import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import MasiveWorkers from "./MasiveWorkers";
import {
  createWorkers,
  getOneWorker,
  editWorkers,
  deleteWorkers,
} from "../api/workers.controllers";
function Form() {
  const params = useParams(); //ID
  const navigate = useNavigate(); //Navegar a otra pagina
  const [Errors, setErrors] = useState([]); //gestion de errores
  //Mostrat el formulario de carga masiva
  const masive = () => {
    document.getElementById("modalPage").style.display = "Block";
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(); //Manejo de formulario con hook form

  //UseEffect para borrar los errores que se hayan registrado
  useEffect(() => {
    const time = setTimeout(() => {
      setErrors(null);
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, [Errors]);

  //Manejo de submit del formulario
  const onSubmit = (data) => {
    //Guardar el formulario
    const saveWorker = async () => {
      Swal.fire({
        title: "Estas seguro?",
        text: "Esta acción no se podrá revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Guardar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await createWorkers(data);
            console.log(res.data);
            if (res.status == 200) {
              swal
                .fire("Colaborador creado con exito!", "", "success")
                .then(() => {
                  navigate("/Workers");
                });
            }
          } catch (error) {
            console.log(error);
            setErrors(error.response.data);
          }
        }
      });
    };
    //Editar formulario
    const editWorker = async () => {
      try {
        Swal.fire({
          title: "Estas seguro?",
          text: "Esta acción no se podrá revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Editar!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await editWorkers(params.id, data);
            if (res.status == 200) {
              swal
                .fire("Colaborador editado con exito!", "", "success")
                .then(() => {
                  navigate("/Workers");
                });
            }
          }
        });
      } catch (error) {
        console.log(error);
        setErrors(error.response.data);
      }
    };
    //verificar si el formulario esta en editar o en crear
    if (params.id) {
      editWorker();
    } else {
      saveWorker();
    }
  };

  //UseEffect para traer los datos del usuario si esta para editar
  useEffect(() => {
    const getWorker = async () => {
      try {
        const res = await getOneWorker(params.id);
        //Seteo de datos en los campos
        reset({
          name: res.data[0].name,
          dni: res.data[0].dni,
          email: res.data[0].email,
          status: res.data[0].status,
          enroll_date: res.data[0].enroll_date.replaceAll("/", "-"),
          branch: res.data[0].branch,
          area: res.data[0].area,
        });
      } catch (error) {
        console.log(error);
        setErrors(error.response.data);
      }
    };
    //Si esta en modo editar (La url tiene id de usuario)  trae los datos del usuario
    if (params.id) {
      getWorker();
    }
  }, []);

  //Eliminar usuario
  const deleteWorker = async () => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: "Esta acción no se podrá revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteWorkers(params.id);
          console.log(res.data);
          if (res.status == 200) {
            swal
              .fire("Colaborador eliminado con exito!", "", "success")
              .then(() => {
                navigate("/Workers");
              });
          }
        }
      });
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="">
      <MasiveWorkers />
      <div className="d-flex flex-column justify-content-center w-50 mx-auto py-3">
        <div>
          <h3>
            <strong>{params.id ? "Editar" : "Crear"} colaborador</strong>
          </h3>
        </div>
        <div>
          {Errors?.length > 0 && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Error</strong> {Errors}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Identificación</label>
              <input
                {...register("dni", { required: true })}
                type="number"
                placeholder=" CC... "
                className="form-control form-control-sm"
              />
              {errors.nit?.type == "required" && (
                <div className="errorMsg">Este campo es requerido</div>
              )}
            </div>
            <div className="form-group">
              <label>Nombre completo</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="form-control form-control-sm"
                placeholder="Nombre..."
              />
              {errors.name && (
                <div className="errorMsg">Este campo es requerido</div>
              )}
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="form-control form-control-sm"
                placeholder="email@ejemplo..."
              />
              {errors.email && (
                <div className="errorMsg">Este campo es requerido</div>
              )}
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                id=""
                className="form-select  form-select-sm"
                {...register("status")}
              >
                <option value="1">Activo</option>
                <option value="2">Inactivo</option>
              </select>
            </div>
            <div className="form-group">
              <label>fecha de ingreso</label>
              <input
                {...register("enroll_date", { required: true })}
                type="date"
                className="form-control form-control-sm"
              />
              {errors.enroll_date && (
                <div className="errorMsg">Este campo es requerido</div>
              )}
            </div>

            <div className="form-group">
              <label>Sede</label>
              <input
                {...register("branch")}
                type="text"
                className="form-control form-control-sm"
                placeholder="Cali, Bogota..."
              />
            </div>
            <div className="form-group">
              <label>Area</label>
              <input
                {...register("area")}
                type="text"
                className="form-control form-control-sm"
                placeholder="Logistica,IT, Mercadeo.."
              />
            </div>
            <div className="my-2">
              {params.id ? (
                <>
                  <button className="btn btn-success btn-sm">Editar</button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm mx-1"
                    onClick={deleteWorker}
                  >
                    Borrar
                  </button>
                </>
              ) : (
                <>
                   <button className="btn btn-success btn-sm ">
                    Agregar
                  </button>
                  <button className="btn btn-dark btn-sm mx-2" onClick={masive} type="button">Carga masiva</button>
               
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;

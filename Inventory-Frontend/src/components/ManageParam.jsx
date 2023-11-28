import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editParams, DeleteParams } from "../lib/saveParams";
function ManageParam({ name, id, value }) {
  //id es el id del parametro
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    editParam();
  };
  const [valor, setValor] = useState(value); //Valor del parametro
  const [param, setParam] = useState(name); //Tipo de parametro

  useEffect(() => {
    setParam(name);
    setValor(value);
  }, [value]);

  const editParam = async () => {
    Swal.fire({
      title: "Estas Seguro ?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, editar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await editParams(id, { name: valor });

          if (res.status == 200) {
            swal.fire("Editado correctamente", "", "success").then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          swal.fire("Tuvimos un error, intenta mas tarde", "", "error");
          console.log(error);
        }
      }
    });
  };
  const deleteParam = async () => {
    Swal.fire({
      title: "Estas Seguro ?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await DeleteParams(id);

          if (res.status == 200) {
            swal.fire("Eliminado correctamente", "", "success").then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          swal.fire("Tuvimos un error, intenta mas tarde", "", "error");
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <div
        className="back w-100 vh-100 d-none d-flex justify-content-center "
        id="addParam"
      >
        <div className="card   d-flex rounded py-4  align-items-center  formContainer">
          <div>
            <h3>Editar {name}</h3>
          </div>
          <div>
            <form
              className="d-flex justify-content-center flex-column gap-3 align-items-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="d-flex gap-2">
                <div className="d-flex flex-column">
                  <label htmlFor="">Parametro</label>
                  <input
                    type="text"
                    className="form-control "
                    disabled
                    value={param}
                    onChange={(e) => {
                      setParam(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-column">
                  <label htmlFor="">Valor</label>
                  <input
                    type="text"
                    className="form-control "
                    value={valor}
                    onChange={(e) => {
                      setValor(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className=" d-flex gap-2">
                <button className="btn btn-success">Editar</button>
                <button className="btn btn-danger" type="button" onClick={()=>{deleteParam()}}>
                  Eliminar
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {
                    document.getElementById("addParam").classList.add("d-none");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageParam;

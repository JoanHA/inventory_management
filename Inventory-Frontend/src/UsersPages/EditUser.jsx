import React, { useEffect, useState } from "react";
import { getOne, deleteUser, updateUser } from "../api/user.controller";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ChangePassword from "../components/changePassword";
import { useAuth } from "../context/AuthContext";
function EditUser() {
  const [editUser, setEditUser] = useState({});
  const params = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function getOne2() {
      const res = await getOne(params.id);
      setEditUser(res.data);
      reset({
        name: res.data.username,
        email: res.data.email,
        rol: res.data.rol == 271 ? "" : res.data.rol,
        status: res.data.status,
      });
    }
    getOne2();
  }, [params.id]);
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Esta seguro?",
      text: "No podras revertir esta acción!!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Actualizar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateUser(params.id, data);
        if (res.status == 200) {
          swal
            .fire("Usuario actualizado con exito!", "", "success")
            .then(() => {
              navigate("/userManagement");
            });
        }
      }
    });
  };
  const deleteUser2 = async () => {
    Swal.fire({
      title: "Estas seguro??",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(params.id);
        if (res.status == 200) {
          swal.fire("Usuario eliminado con exito!", "", "info").then(() => {
            navigate("/userManagement");
          });
        }
      }
    });
  };
  const masive = () => {
    document.getElementById("modalPage").style.display = "Block";
  };
  return (
    <div>
      <ChangePassword />
      <div className="title">
        <div className="event_header d-flex justify-content-between">
          <span>
            <strong> Administracion de usuarios</strong>
          </span>
          <Link to={"/userManagement"} className="btn btn-dark mt-0 btn-sm">
            Volver
          </Link>
        </div>
      </div>
      <div className="py-2">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-50 mx-auto my-auto">
              <div className="form-group">
                <h1>Editar usuario </h1>
                <Link
                  className="my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  onClick={masive}
                >
                  Cambiar contraseña
                </Link>
                <br />
                <label className="mt-2">Nombre de usuario</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name")}
                />
              </div>
              <div className="form-group">
                <label>Correo</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select
                  className="form-select"
                  {...register("rol")}
                  disabled={editUser.id == user.id? true : false}
                >
                  {editUser.rol == 271 ? (
                    <option selected value={""}>
                      Administrador superior
                    </option>
                  ) : (
                    false
                  )}
                  <option value="270">Administrador</option>
                  <option value="273">Operador</option>
                  <option value="272">Visitante</option>
                </select>
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select className="form-select" {...register("status")}>
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                  <option value="3">Eliminado</option>
                </select>
              </div>
              <div>
                <button
                  className="btn btn-success"
                  disabled={editUser.rol == 271 ? true : false}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger mx-1 my-3"
                  type="button"
                  onClick={deleteUser2}
                  disabled={user.rol == 272 || user.rol==273 ? true:false}
                >
                  Eliminar usuario
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;

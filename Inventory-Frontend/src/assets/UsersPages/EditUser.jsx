import React, { useEffect, useState } from "react";
import { getOne, deleteUser,updateUser } from "../../api/user.controller";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function EditUser() {
  const [editUser, setEditUser] = useState({});
  const params = useParams();
  const navigate = useNavigate()
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
        rol: res.data.rol ==271? 270: res.data.rol,
        status: res.data.status,
      });
    }
    getOne2();
  }, []);
  const onSubmit = async (data) => {
    const res = await updateUser(params.id,data);

    if (res.status == 200) {
      swal.fire("Usuario actualizado con exito!","","success").then(()=>{
        navigate("/userManagement")
      });
    }
  };
  const deleteUser2 = async () => {
    const res = await deleteUser(params.id);
   
  };
  return (
    <div>
      <div className="title">
        <div className="event_header">Editar usuario</div>
      </div>
      <div className="py-2">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-50 mx-auto my-auto">
              <div className="form-group">
                <h1>Editar usuario </h1>
                <Link className="my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" onClick={()=>{console.log("clicked")}}>Cambiar contraseña</Link>
                <br />
                <label>Nombre</label>
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
                <select className="form-select" {...register("rol")} disabled={editUser.rol ==271 ? true:false}>
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
                <button className="btn btn-success">Editar</button>
                <button
                  className="btn btn-danger mx-1 my-3"
                  type="button"
                  onClick={deleteUser2}
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

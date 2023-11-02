import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/user.controller";
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
function UserManagement() {
  const [users, setUsers] = useState([]);
  const {user} = useAuth()
  

  useEffect(() => {
    const getData = async () => {
      const res = await getUsers(user.id);

      const datos =res.data
      setUsers(datos);
    };
    getData();
  }, []);
  return (
    <div>
      <div className="UserTitle">
        <div className="event_header">
              Administración de Usuarios 
        </div>
      </div>
      <div className="roles px-4 pt-2">
        <div>
          <h3>Roles y permisos</h3>
        </div>
        <div>
          <ul className="list-group list-group-flush row flex-row flex-wrap ">
            <li className=" py-1  w-50">
              <strong>Administrador Superior:</strong>
               (Ver, Crear, Editar, Eliminar, Manejo de
              usuarios)
            </li>
            <li className=" py-1 w-50">
              <strong> Administrador:</strong> (Ver, Crear, Editar, Eliminar)
            </li>
            <li className="py-1  w-50"> <strong>Operador: </strong>(Ver,Crear, Eliminar)</li>
            <li className="py-1 w-50"> <strong>Visitante:</strong>(Ver)</li>
          </ul>
        </div>
      </div>

      <div className="Users">
        <div className="userTable table-responsive px-3 py-1">
          <div className=" d-flex  w-100 justify-content-end px-5"><button className="btn btn-primary mx-4">Nuevo</button></div>
          <table className="table table-hover ">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td> {user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.rolName}</td>
                  <td>{user.statusName}</td>
                  <td>{(user.created_at).split("T")[0]}</td>
                  <td >
                    <Link to={`/editUser/${user.id}`} className="btn btn-warning mx-1">Editar</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

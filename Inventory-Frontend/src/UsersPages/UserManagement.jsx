import React, { useEffect, useState } from "react";
import { getUsers } from "../api/user.controller";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

import Table from "../components/Table";
function UserManagement() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const res = await getUsers(user.id);
      const datos = res.data;
      setUsers(datos);
    };
    getData();
  }, []);
  const columns = [
   
    {
      header: "Usuario",
      accessorKey: "username",
    },
    {
      header: "Correo",
      accessorKey: "email",
    },
    {
      header: "Rol",
      accessorKey: "rolName",
    },
    {
      header: "Estado",
      accessorKey: "statusName",
    },
    {
      header: "Creacion",
      accessorKey: "created_at",
    },
  ];
  return (
    <div>
       <Helmet>
          <title>Usuarios</title>
        </Helmet>
      <div className="UserTitle">
        <div className="event_header">Administración de Usuarios</div>
      </div>
      <div className="roles px-4 pt-2">
        <div>
          <h3> <strong>Roles y permisos</strong></h3>
        </div>
        <div>
          <ul className="list-group list-group-flush row flex-row flex-wrap ">
            <li className=" py-1  w-50">
              <strong>Administrador Superior:</strong>
              (Ver, Crear, Editar, Eliminar, Manejo de usuarios)
            </li>
            <li className=" py-1 w-50">
              <strong> Administrador:</strong> (Ver, Crear, Editar, Eliminar)
            </li>
            <li className="py-1  w-50">
              <strong>Operador: </strong>(Ver,Crear, Eliminar)
            </li>
            <li className="py-1 w-50">
              <strong>Visitante:</strong>(Ver)
            </li>
          </ul>
        </div>
      </div>

      <div className="Users">
        <div className="userTable table-responsive px-3 py-1">
          <div className="d-flex justify-content-end">
            <Link to="/createUser" className="btn btn-primary mx-1">
              Nuevo Usuario
            </Link>
          </div>
          <Table data={users} columns={columns} editType={"editUser"} />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

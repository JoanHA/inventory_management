import{r as e,u as c,j as s,L as n,g as o}from"./index-583ba0dd.js";import{H as d}from"./Helmet-0065415a.js";import m from"./Table-57ff4f70.js";import"./iconBase-8e0a2488.js";import"./index.esm-c7f5b4eb.js";import"./index.esm-738b08dd.js";import"./jspdf.es.min-7fb539e6.js";function v(){const[r,a]=e.useState([]),{user:i}=c();e.useEffect(()=>{(async()=>{const l=(await o(i.id)).data;a(l)})()},[]);const t=[{header:"Usuario",accessorKey:"username"},{header:"Correo",accessorKey:"email"},{header:"Rol",accessorKey:"rolName"},{header:"Estado",accessorKey:"statusName"},{header:"Creacion",accessorKey:"created_at"}];return s.jsxs("div",{children:[s.jsx(d,{children:s.jsx("title",{children:"Usuarios"})}),s.jsx("div",{className:"UserTitle",children:s.jsx("div",{className:"event_header",children:"Administración de Usuarios"})}),s.jsxs("div",{className:"roles px-4 pt-2",children:[s.jsx("div",{children:s.jsxs("h3",{children:[" ",s.jsx("strong",{children:"Roles y permisos"})]})}),s.jsx("div",{children:s.jsxs("ul",{className:"list-group list-group-flush row flex-row flex-wrap ",children:[s.jsxs("li",{className:" py-1  w-50",children:[s.jsx("strong",{children:"Administrador Superior:"}),"(Ver, Crear, Editar, Eliminar, Manejo de usuarios)"]}),s.jsxs("li",{className:" py-1 w-50",children:[s.jsx("strong",{children:" Administrador:"})," (Ver, Crear, Editar, Eliminar)"]}),s.jsxs("li",{className:"py-1  w-50",children:[s.jsx("strong",{children:"Operador: "}),"(Ver,Crear, Eliminar)"]}),s.jsxs("li",{className:"py-1 w-50",children:[s.jsx("strong",{children:"Visitante:"}),"(Ver)"]})]})})]}),s.jsx("div",{className:"Users",children:s.jsxs("div",{className:"userTable table-responsive px-3 py-1",children:[s.jsx("div",{className:"d-flex justify-content-end",children:s.jsx(n,{to:"/createUser",className:"btn btn-primary mx-1",children:"Nuevo Usuario"})}),s.jsx(m,{data:r,columns:t,editType:"editUser"})]})})]})}export{v as default};

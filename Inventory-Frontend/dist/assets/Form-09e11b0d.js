import{r as m,j as e,c as N,d as y}from"./index-583ba0dd.js";import{u as j}from"./index.esm-5dab2a19.js";import E from"./Table-57ff4f70.js";import{a as C,s as w,b as k,d as q,c as B,e as S}from"./workers.controllers-f5f692a9.js";/* empty css            */function M({id:s}){const l=[{header:"Equipo",accessorKey:"name"},{header:"Modelo",accessorKey:"model"},{header:"Tipo de equipo",accessorKey:"equipment_type_name"},{header:"Estado",accessorKey:"status_name"}],[n,c]=m.useState([]);m.useEffect(()=>{(async()=>{try{const a=await C(s);c(a.data)}catch(a){console.log(a)}})()},[]);const d=()=>{document.getElementById("asignedModal").classList.remove("d-block")};return e.jsx("div",{id:"asignedModal",className:"modalPage",children:e.jsxs("div",{className:"card w-50 mx-auto py-3",children:[e.jsx("div",{className:"text-center",children:e.jsx("h2",{children:e.jsx("strong",{children:"Equipos asignados"})})}),e.jsxs("div",{className:"px-5 ",children:[e.jsx("div",{className:"mb-2",children:e.jsx("button",{className:"btn btn-danger rounded",onClick:d,children:"Cerrar"})}),n.length>0?e.jsx(E,{data:n,columns:l,editType:"edit"}):e.jsx("div",{children:e.jsx("div",{className:"text-center",children:e.jsx("h3",{children:"Este colaborador no tiene equipos asignados"})})})]})]})})}function W(){var a;const s=()=>{document.getElementById("modalPage").style.display="None"},{register:l,handleSubmit:n,reset:c,formState:{errors:d}}=j(),t=async p=>{const u=new FormData;u.append("file",p.file[0]);try{(await w(u)).status==200?swal.fire("Datos guardados","","success").then(()=>{c(),s()}):swal.fire("Lo sentimos algo salio mal","","error").then(()=>{c(),s()})}catch(x){console.log(x)}};return e.jsx("div",{className:"modalPage",id:"modalPage",children:e.jsx("div",{className:"card w-50 mx-auto px-4 py-4 rounded",children:e.jsx("form",{onSubmit:n(t),children:e.jsxs("div",{className:"form-group mx-auto py-2",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{children:"Carga Masiva de datos"}),e.jsx("label",{htmlFor:"",className:"mb-3",children:"Selecciona el archivo con los datos a subir..."}),e.jsx("div",{className:" text-center"})]}),e.jsxs("div",{className:"text-center d-flex flex-column mb-2 align-items-center",children:[((a=d.file)==null?void 0:a.type)=="required"&&e.jsx("p",{className:"errorMsg mb-0",children:"Este campo no puede ir vacio"}),e.jsx("input",{type:"file",className:"form-control mb-3",...l("file",{required:!0})}),e.jsx("p",{className:"errorMsg align-self-center",children:"Recuerda que debe ser un archivo excel (.xls)"})]}),e.jsxs("div",{className:"form-group text-center ",children:[e.jsx("button",{className:"btn btn-success mt-1",children:"Enviar"}),e.jsx("button",{className:"btn btn-danger mx-1 mt-1",type:"button",onClick:s,children:"Cancelar"})]})]})})})})}function A(){var f;const s=N(),l=y(),[n,c]=m.useState([]),d=()=>{document.getElementById("modalPage").style.display="Block"},{register:t,formState:{errors:a},handleSubmit:p,reset:u}=j();m.useEffect(()=>{const o=setTimeout(()=>{c(null)},3e3);return()=>{clearTimeout(o)}},[n]);const x=o=>{const r=async()=>{Swal.fire({title:"Estas seguro?",text:"Esta acción no se podrá revertir!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, Guardar!"}).then(async i=>{if(i.isConfirmed)try{(await B(o)).status==200&&swal.fire("Colaborador creado con exito!","","success").then(()=>{l("/Workers")})}catch(h){console.log(h),c(h.response.data)}})},v=async()=>{try{Swal.fire({title:"Estas seguro?",text:"Esta acción no se podrá revertir!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, Editar!"}).then(async i=>{i.isConfirmed&&(await S(s.id,o)).status==200&&swal.fire("Colaborador editado con exito!","","success").then(()=>{l("/Workers")})})}catch(i){console.log(i),c(i.response.data)}};s.id?v():r()};m.useEffect(()=>{const o=async()=>{try{const r=await k(s.id);u({name:r.data[0].name,dni:r.data[0].dni,email:r.data[0].email,status:r.data[0].status,enroll_date:r.data[0].enroll_date.replaceAll("/","-"),branch:r.data[0].branch,area:r.data[0].area,occupation:r.data[0].occupation})}catch(r){console.log(r),c(r.response.data)}};s.id&&o()},[]);const g=async()=>{try{Swal.fire({title:"Estas seguro?",text:"Esta acción no se podrá revertir!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, eliminar!"}).then(async o=>{o.isConfirmed&&(await q(s.id)).status==200&&swal.fire("Colaborador eliminado con exito!","","success").then(()=>{l("/Workers")})})}catch(o){console.log(o),c(o.response.data)}},b=()=>{document.getElementById("asignedModal").classList.add("d-block")};return e.jsxs("div",{className:"",children:[e.jsx(W,{}),e.jsx(M,{id:s.id}),e.jsxs("div",{className:"d-flex flex-column justify-content-center w-50 mx-auto py-1",children:[e.jsx("div",{children:e.jsx("h3",{children:e.jsxs("strong",{children:[s.id?"Editar":"Crear"," colaborador"]})})}),e.jsxs("div",{children:[(n==null?void 0:n.length)>0&&e.jsxs("div",{className:"alert alert-warning alert-dismissible fade show",role:"alert",children:[e.jsx("strong",{children:"Error"})," ",n]}),e.jsxs("form",{onSubmit:p(x),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Identificación"}),e.jsx("input",{...t("dni",{required:!0}),type:"number",placeholder:"CC... ",className:"form-control form-control-sm"}),((f=a.nit)==null?void 0:f.type)=="required"&&e.jsx("div",{className:"errorMsg",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Nombre completo"}),e.jsx("input",{...t("name",{required:!0}),type:"text",className:"form-control form-control-sm",placeholder:"Nombre..."}),a.name&&e.jsx("div",{className:"errorMsg",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Correo"}),e.jsx("input",{...t("email"),type:"email",className:"form-control form-control-sm",placeholder:"Email@ejemplo..."}),a.email&&e.jsx("div",{className:"errorMsg",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Cargo"}),e.jsx("input",{...t("occupation"),type:"text",className:"form-control form-control-sm",placeholder:"Mensajero, analista..."}),a.email&&e.jsx("div",{className:"errorMsg",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Estado"}),e.jsxs("select",{id:"",className:"form-select  form-select-sm",...t("status"),children:[e.jsx("option",{value:"1",children:"Activo"}),e.jsx("option",{value:"2",children:"Inactivo"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Fecha de ingreso"}),e.jsx("input",{...t("enroll_date",{required:!0}),type:"date",className:"form-control form-control-sm"}),a.enroll_date&&e.jsx("div",{className:"errorMsg",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Sede"}),e.jsx("input",{...t("branch"),type:"text",className:"form-control form-control-sm",placeholder:"Cali, Bogota..."})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Area"}),e.jsx("input",{...t("area"),type:"text",className:"form-control form-control-sm",placeholder:"Logistica,IT, Mercadeo.."})]}),e.jsx("div",{className:"my-2",children:s.id?e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-success btn-sm",children:"Editar"}),e.jsx("button",{type:"button",className:"btn btn-danger btn-sm mx-1",onClick:g,children:"Borrar"}),e.jsx("button",{className:"btn btn-info btn-sm",type:"button",onClick:b,children:"Equipos asignados"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-success btn-sm ",children:"Agregar"}),e.jsx("button",{className:"btn btn-dark btn-sm mx-2",onClick:d,type:"button",children:"Carga masiva"})]})})]})]})]})]})}export{A as F};
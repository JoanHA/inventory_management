import{c as q,u as z,r as h,d as S,j as e,e as B,L as k,f as P}from"./index-cbb2da5c.js";import{u as A}from"./index.esm-ff6dab22.js";/* empty css            */import{b as u,c as x}from"./index.esm-1d360ac2.js";import{V as I}from"./Volver-547a6aaf.js";import{H as M}from"./Helmet-404090e4.js";import"./iconBase-03adfd0f.js";function O(){var g,b,w,E,C;const l=()=>{document.getElementById("modalPage").style.display="None"},d=q(),{user:t,PasswordChanger:o,Errores:p,logOut:n}=z(),[j,f]=h.useState(null),N=S(),{register:i,handleSubmit:y,reset:a,formState:{errors:s}}=A(),v=async r=>{r.id=d.id;try{await o(r)==200&&(t.id==d.id?swal.fire("Contraseña cambiada con exito!","","success").then(()=>{n()}):swal.fire("Contraseña cambiada con exito!","","success").then(()=>{N("/userManagement")}))}catch(c){console.log(c)}};h.useEffect(()=>{(async()=>{try{const c=await B(d.id);f(c.data.rol)}catch(c){console.log(c)}})()},[]);const m=r=>{document.getElementById(`eye-line${r}`).classList.toggle("inactive"),document.getElementById(`eye-outline${r}`).classList.toggle("inactive"),document.getElementById(`input-pass${r}`).type=document.getElementById(`input-pass${r}`).type=="text"?"password":"text"};return e.jsx("div",{className:"modalPage",id:"modalPage",children:e.jsx("div",{className:"card w-50 mx-auto px-4 py-4 rounded",children:e.jsx("form",{onSubmit:y(v),children:e.jsxs("div",{className:"form-group mx-auto py-2",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{children:"Cambiar contraseña"}),p&&p.map(r=>e.jsxs("div",{className:"spanError",children:[e.jsx("div",{}),r]},0))]}),j==271?e.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center gap-1",children:[e.jsxs("div",{className:"form-group  d-flex flex-column w-50",children:[e.jsx("label",{htmlFor:"",children:"Contraseña actual"}),e.jsxs("div",{className:"d-flex flex-row",children:[e.jsx("input",{id:"input-pass1",type:"password",...i("Password",{required:!0}),className:"form-control form-control-sm rounded ",placeholder:"Actual..."}),e.jsx("span",{className:"input-group-text ",children:e.jsxs("a",{onClick:()=>{m("1")},children:[e.jsx(u,{size:"1.5rem",className:"eye",id:"eye-outline1"}),e.jsx(x,{size:"1.5rem",style:{display:"block"},className:"eye inactive",id:"eye-line1"})]})})]}),((g=s.password)==null?void 0:g.type)=="required"&&e.jsx("p",{className:"errorMsg mb-0",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group d-flex flex-column w-50",children:[e.jsx("label",{htmlFor:"",children:"Nueva contraseña"}),e.jsxs("div",{className:"d-flex flex-row",children:[e.jsx("input",{id:"input-pass2",type:"password",...i("Newpassword",{required:!0}),className:"form-control form-control-sm rounded ",placeholder:"Nueva..."}),e.jsx("span",{className:"input-group-text ",children:e.jsxs("a",{onClick:()=>{m("2")},children:[e.jsx(u,{size:"1.5rem",className:"eye",id:"eye-outline2"}),e.jsx(x,{size:"1.5rem",style:{display:"block"},className:"eye inactive",id:"eye-line2"})]})})]}),((b=s.Newpassword)==null?void 0:b.type)=="required"&&e.jsx("p",{className:"errorMsg mb-0",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group d-flex flex-column w-50",children:[e.jsx("label",{htmlFor:"",children:"Confirma contraseña"}),e.jsxs("div",{className:"d-flex flex-row",children:[e.jsx("input",{type:"password",id:"input-pass3",...i("Confirmpassword",{required:!0}),className:"form-control form-control-sm rounded ",placeholder:"Confirma nueva..."}),e.jsx("span",{className:"input-group-text ",children:e.jsxs("a",{onClick:()=>{m("3")},children:[e.jsx(u,{size:"1.5rem",className:"eye",id:"eye-outline3"}),e.jsx(x,{size:"1.5rem",style:{display:"block"},className:"eye inactive",id:"eye-line3"})]})})]}),((w=s.Confirmpassword)==null?void 0:w.type)=="required"&&e.jsx("p",{className:"errorMsg mb-0",children:"Este campo es requerido"})]})]}):e.jsxs("div",{className:"d-flex flex-column justify-content-center align-items-center gap-1",children:[e.jsxs("div",{className:"form-group d-flex flex-column w-50",children:[e.jsx("label",{htmlFor:"",children:"Nueva contraseña"}),e.jsxs("div",{className:"d-flex flex-row",children:[e.jsx("input",{type:"password",id:"input-pass1",...i("Newpassword",{required:!0}),className:"form-control form-control-sm rounded ",placeholder:"Nueva ..."}),e.jsx("span",{className:"input-group-text ",children:e.jsxs("a",{onClick:()=>{m("1")},children:[e.jsx(u,{size:"1.5rem",className:"eye",id:"eye-outline1"}),e.jsx(x,{size:"1.5rem",style:{display:"block"},className:"eye inactive",id:"eye-line1"})]})})]}),((E=s.Newpassword)==null?void 0:E.type)=="required"&&e.jsx("p",{className:"errorMsg mb-0",children:"Este campo es requerido"})]}),e.jsxs("div",{className:"form-group d-flex flex-column w-50",children:["Confirma contraseña",e.jsxs("div",{className:"d-flex flex-row",children:[e.jsx("input",{type:"password",...i("Confirmpassword",{required:!0}),className:"form-control form-control-sm rounded ",placeholder:"Confirma nueva...",id:"input-pass2"}),e.jsx("span",{className:"input-group-text ",children:e.jsxs("a",{onClick:()=>{m("2")},children:[e.jsx(u,{size:"1.5rem",className:"eye",id:"eye-outline2"}),e.jsx(x,{size:"1.5rem",style:{display:"block"},className:"eye inactive",id:"eye-line2"})]})})]}),((C=s.Confirmpassword)==null?void 0:C.type)=="required"&&e.jsx("p",{className:"errorMsg mb-0",children:"Este campo es requerido"})]})]}),e.jsxs("div",{className:"form-group text-center mt-2 ",children:[e.jsx("button",{className:"btn btn-success mt-1",children:"Confirmar"}),e.jsx("button",{className:"btn btn-danger mx-1 mt-1",type:"button",onClick:l,children:"Cancelar"})]})]})})})})}function T(){const[l,d]=h.useState({}),t=q(),{user:o}=z(),p=S(),{register:n,handleSubmit:j,reset:f,formState:{errors:N}}=A();h.useEffect(()=>{async function a(){const s=await B(t.id);d(s.data),f({name:s.data.username,email:s.data.email,rol:s.data.rol==271?"":s.data.rol,status:s.data.status})}a()},[t.id]);const i=async a=>{Swal.fire({title:"Esta seguro?",text:"No podras revertir esta acción!!",icon:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, Actualizar!"}).then(async s=>{s.isConfirmed&&(a.rol==""?a.rol=271:a.rol=a.rol,(await P(t.id,a)).status==200&&swal.fire("Usuario actualizado con exito!","","success").then(()=>{p("/userManagement")}))})},y=()=>{document.getElementById("modalPage").style.display="Block"};return e.jsxs("div",{children:[e.jsx(O,{}),e.jsx(M,{children:e.jsx("title",{children:"Editar usuario"})}),e.jsx("div",{className:"title",children:e.jsxs("div",{className:"event_header d-flex justify-content-between",children:[e.jsx("span",{children:e.jsx("strong",{children:" Administracion de usuarios"})}),e.jsx(I,{})]})}),e.jsx("div",{className:"py-2",children:e.jsx("div",{children:e.jsx("form",{onSubmit:j(i),children:e.jsxs("div",{className:"w-50 mx-auto my-auto",children:[e.jsxs("div",{className:"form-group",children:[e.jsxs("h3",{children:[" ",e.jsx("strong",{children:"Editar usuario"})," "]}),e.jsx(k,{className:"my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",onClick:y,children:"Cambiar contraseña"}),o.rol&&o.rol==271&&o.id==t.id&&e.jsx(k,{className:"px-3 my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover",to:"/editParams",children:"Editar parametros"}),e.jsx("br",{}),e.jsx("label",{className:"mt-2",children:"Nombre de usuario"}),e.jsx("input",{type:"text",className:"form-control",...n("name")})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Correo"}),e.jsx("input",{type:"text",className:"form-control",...n("email")})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Rol"}),e.jsxs("select",{className:"form-select",...n("rol"),disabled:l.id==o.id,children:[l.rol==271?e.jsx("option",{selected:!0,value:"",children:"Administrador superior"}):!1,e.jsx("option",{value:"270",children:"Administrador"}),e.jsx("option",{value:"273",children:"Operador"}),e.jsx("option",{value:"272",children:"Visitante"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"Estado"}),e.jsxs("select",{className:"form-select",...n("status"),disabled:l.rol==271,children:[e.jsx("option",{value:"1",children:"Activo"}),e.jsx("option",{value:"2",children:"Inactivo"}),e.jsx("option",{value:"3",children:"Eliminado"})]})]}),e.jsxs("div",{children:[e.jsx("button",{className:"btn btn-success my-2",children:"Editar"}),l.rol==271?"":e.jsx("div",{})]})]})})})})]})}export{T as default};

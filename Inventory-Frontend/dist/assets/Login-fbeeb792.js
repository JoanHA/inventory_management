import{d as x,u as f,j as e,L as o}from"./index-cbb2da5c.js";import{l as p}from"./grupo-carval-Logo-Bioart-1cfb8043.js";import{u as h}from"./index.esm-ff6dab22.js";/* empty css                 */function w(){var r,l;const c=x(),{GetIn:d,Errores:s}=f(),{register:n,handleSubmit:m,formState:{errors:a}}=h(),u=async t=>{try{const i=await d(t);if(s==null&&i.data.status==200){Swal.fire({position:"center",showClass:{popup:"Swal animate__animated animate__fadeInDown"},hideClass:{popup:"animate__animated animate__fadeOutUp"},icon:"success",title:"Inicio de sesión correcto!",showConfirmButton:!1,timer:2e3}).then(()=>{c("/"),location.reload()});return}}catch(i){console.log(i)}};return e.jsx("div",{children:e.jsx("div",{className:"d-flex  align-items-center justify-content-center ",children:e.jsxs("div",{id:"form-container",className:"  gap-3 py-3  mt-4",style:{width:"300px",maxWidth:"30rem"},children:[e.jsx("div",{className:"d-flex justify-content-center flex-column align-items-center",children:e.jsx("div",{className:"d-flex align-items-center px-3",style:{height:"80px",borderRadius:"200px"},children:e.jsx("img",{src:p,alt:"",width:200})})}),e.jsxs("div",{className:"d-flex justify-content-center align-items-center flex-column",children:[e.jsx("form",{action:"",className:"w-75",onSubmit:m(u),children:e.jsxs("div",{className:"d-flex flex-column gap-2 justify-content-center ",children:[s&&s.map(t=>e.jsxs("div",{className:"spanError",children:[e.jsx("div",{}),t]},0)),e.jsxs("div",{className:"form-floating rounded ",children:[e.jsx("input",{type:"email",className:"form-control form-control-sm inputs",id:"floatingInput",...n("email",{required:!0})}),((r=a.email)==null?void 0:r.type)==="required"&&e.jsx("p",{className:"errorMsg",children:"Este campo es requerido"}),e.jsx("label",{htmlFor:"floatingInput",children:"Correo "})]}),e.jsxs("div",{className:"form-floating",children:[e.jsx("input",{type:"password",className:"form-control form-control-sm inputs",id:"floatingPassword",...n("password",{required:!0})}),((l=a.password)==null?void 0:l.type)==="required"&&e.jsx("p",{className:"errorMsg",children:"Este campo es requerido"}),e.jsx("label",{htmlFor:"floatingPassword",children:"Contraseña"})]}),e.jsx("div",{className:"d-flex justify-content-center w-100 mt-3",children:e.jsx("button",{className:"btn btn-success w-75",children:"Iniciar sesión"})})]})}),e.jsxs("div",{className:"d-flex  flex-column mt-3  align-items-center justify-content-between w-100 px-2 ",children:[e.jsx("div",{children:e.jsx(o,{className:"initLink ",to:"/enterEmail",children:"¿Olvidaste tu contraseña?"})}),e.jsxs("div",{children:[e.jsx("label",{className:"initLabel",children:" ¿No tienes cuenta?"}),e.jsx(o,{to:"/register",className:"initLink ",children:"Crea una cuenta"})]})]})]})]})})})}export{w as default};

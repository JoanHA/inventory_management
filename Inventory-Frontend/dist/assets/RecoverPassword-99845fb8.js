import{d as h,r as d,u as g,j as e,k as j}from"./index-583ba0dd.js";/* empty css                 */import{u as w}from"./index.esm-5dab2a19.js";function v(){var o,c,l,i;const{register:a,handleSubmit:u,formState:{errors:r}}=w(),x=h(),[t,n]=d.useState(!1),{email:p}=g(),f=async s=>{if(s.password!=s.confirmPassword)return n(!0);try{(await j({email:p,password:s.password})).status==200&&swal.fire("Tu contraseña ha sido cambiada","","success").then(()=>{x("/login")})}catch(m){console.log(m)}};return d.useEffect(()=>{const s=setTimeout(()=>{n(!1)},3e3);return()=>{clearTimeout(s)}},[t]),e.jsx("div",{children:e.jsxs("div",{className:"my-5 text-center rounded verifyPassword d-flex flex-column gap-1 mx-auto",children:[e.jsx("div",{className:"d-flex flex-column",children:e.jsx("h2",{style:{fontWeight:"bolder"},className:"align-self-start",children:"Cambiar contraseña"})}),e.jsx("div",{children:e.jsxs("form",{onSubmit:u(f),children:[e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("label",{className:"align-self-start",children:"Nueva contraseña"}),e.jsx("input",{type:"password",...a("password",{required:!0,minLength:8}),className:"form-control"}),((o=r.password)==null?void 0:o.type)==="required"&&e.jsx("p",{className:"errorMsg",style:{margin:"0px"},children:"Este campo es requerido"}),((c=r.password)==null?void 0:c.type)==="minLength"&&e.jsx("p",{className:"errorMsg",style:{margin:"0px"},children:"La contraseña debe tener al menos 8 caracteres"})]}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("label",{className:"align-self-start",children:"Confirmar contraseña"}),e.jsx("input",{type:"password",...a("confirmPassword",{required:!0,minLength:8}),className:"form-control"}),((l=r.confirmPassword)==null?void 0:l.type)==="required"&&e.jsx("p",{className:"errorMsg",style:{margin:"0px"},children:"Este campo es requerido"}),((i=r.confirmPassword)==null?void 0:i.type)==="minLength"&&e.jsx("p",{className:"errorMsg",style:{margin:"0px"},children:"La contraseña debe tener al menos 8 caracteres"})]}),t&&e.jsx("p",{className:"errorMsg",children:"Las contraseñas no conciden"}),e.jsx("div",{className:"w-100 mt-2",children:e.jsx("div",{children:e.jsx("button",{className:"btn btn-primary btn-block w-100",children:"Restablecer contraseña"})})})]})})]})})}export{v as default};

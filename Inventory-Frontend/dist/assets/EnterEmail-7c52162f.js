import{b as x,U as f,d as g,u as j,r as v,j as e}from"./index-583ba0dd.js";/* empty css                 */import{u as b}from"./index.esm-5dab2a19.js";const y=s=>x.post(f+"api/recover/send_recovery_email",s);function _(){var t;const s=g(),{setEmail:n,setOtp:o}=j(),[c,r]=v.useState(!1),{register:l,handleSubmit:d,formState:{errors:m}}=b(),u=async a=>{r(!0),n(a.recipient_email);const i=parseInt(Math.random()*(9999-1e3)+1e3);o(i);const p={OTP:i,recipient_email:a.recipient_email};try{(await y(p)).status==200&&(r(!1),swal.fire("Tu codigo ha sido enviado","","success").then(()=>{s("/otp")}))}catch{r(!1),swal.fire("No pudimos enviar tu codigo intenta mas tarde","","error")}};return e.jsx("div",{className:"w-100 h-100 d-flex justify-content-center",children:e.jsx("div",{className:"my-5 rounded emailForm",children:e.jsxs("div",{children:[c&&e.jsx("div",{children:"Estamos generando tu codigo..."}),e.jsxs("form",{onSubmit:d(u),children:[e.jsxs("div",{className:"d-flex flex-column align-items-center",children:[e.jsx("strong",{children:e.jsx("h2",{style:{fontWeight:"bolder"},children:"Olvidaste tu contraseña"})}),e.jsx("p",{children:"Ingresa tu email para restablecerla"})]}),e.jsxs("div",{children:[e.jsx("input",{type:"email",className:"form-control",placeholder:"Ingresa tu email",...l("recipient_email",{required:!0})}),((t=m.recipient_email)==null?void 0:t.type)==="required"&&e.jsx("p",{className:"errorMsg",style:{margin:"0px"},children:"Este campo es requerido"})]}),e.jsx("div",{className:"w-100",children:e.jsx("button",{className:"btn-success btn btn-lg mt-1 btn-block w-100",children:"Continuar"})})]})]})})})}export{_ as default};

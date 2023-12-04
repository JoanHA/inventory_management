import{u as _,r as o,c as F,j as e,L as S,U as q,b as C}from"./index-ff15ffff.js";import{c as k,u as R,d as D}from"./events.controller-c70b4491.js";import{u as O}from"./index.esm-928e4bdd.js";import{f as T}from"./file-download-cca85fc9.js";import{H as U}from"./Helmet-5b044e24.js";import{V}from"./Volver-3dcaf083.js";/* empty css              */function B(){var x;const{user:u}=_(),[h,i]=o.useState("NONE"),n=F(),[p,j]=o.useState(null),{register:t,handleSubmit:f,reset:v,watch:c,formState:{errors:b}}=O(),[d,N]=o.useState(""),[m,y]=o.useState({});o.useEffect(()=>{async function l(){const r=await k(n.id);j(r.data[0].equip);const s=r.data[0];y(s),N(`${q}${s.file}`);const a=s.created_at.split("T");v({name:s.name,date:a[0],description:s.description,importance:s.importance_name,event_reason:s.reason_name,event_type:s.event_type_name,client:s.user_name,user:s.user,status:s.status_name,serial:s.serial,equip:s.equip_name,user_id:s.client})}l()},[]);const g=l=>{async function r(s){const a=await D(n.id,s);console.log(a),a.status===200&&swal.fire("Estado Cambiado","","success").then(()=>{location.reload()})}r(l.newStatus)},w=(l,r)=>{C.get(l,{responseType:"blob"}).then(s=>{T(s.data,r)}).catch(s=>{swal.fire("Este evento no tiene archivos para descargar","","info")})},E=async()=>{const l={name:c("name"),description:c("description")};try{(await R(n.id,l)).status===200&&swal.fire("Editado correctamente","","success").then(()=>{location.reload()})}catch(r){swal.fire("Tuvimos un error, intenta mas tarde","","error"),console.log(r)}};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"event_header mb-2  d-flex justify-content-between",children:["Evento del equipo ",e.jsx(V,{}),e.jsx(U,{children:e.jsx("title",{children:"Eventos equipo"})})]}),e.jsxs("div",{className:"d-flex flex-column px-3 py-1",children:[e.jsx("div",{className:"d-flex  flex-column  ",children:e.jsxs("div",{className:"d-flex gap-3  w-100  flex-row justify-content-center  align-items-center ",children:[e.jsx("h3",{className:"mt-3 mb-0",children:"Equipo"}),e.jsxs("div",{className:"form-group col-md-2",children:[e.jsx("label",{htmlFor:"",children:"Serial"}),e.jsx("input",{disabled:!0,type:"text",...t("serial"),className:"form-control form-control-sm"})]}),e.jsxs("div",{className:"form-group   col-md-2",children:[e.jsx("label",{htmlFor:"",children:"Equipo"}),e.jsx("input",{disabled:!0,type:"text",...t("equip"),className:"form-control form-control-sm"})]})]})}),e.jsxs("div",{children:[e.jsx("div",{className:"event_title ",children:e.jsx("h2",{children:"Evento"})}),e.jsx("div",{className:"",children:e.jsxs("div",{className:"row mx-auto  w-75",children:[e.jsxs("div",{className:"form-group my-1  col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Nombre del evento"})}),e.jsx("div",{children:e.jsx("input",{type:"text",...t("name"),className:"form-control form-control-sm"})})]}),e.jsxs("div",{className:"form-group my-1  col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Tipo de evento"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,type:"text",...t("event_type"),className:"form-control form-control-sm"})})]}),e.jsxs("div",{className:"form-group  my-1 col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Fecha de realizacion"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,type:"text",...t("date"),className:"form-control form-control-sm"})})]}),e.jsxs("div",{className:"form-group mb-2 col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Importancia"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,type:"text",...t("importance"),className:"form-control form-control-sm"})})]}),e.jsxs("div",{className:"form-group mb-2  col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Razon del evento"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,type:"text",...t("event_reason"),className:"form-control form-control-sm"})})]}),e.jsxs("div",{className:"form-group mb-2 col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Archivo adjunto"})}),e.jsx("div",{children:e.jsxs("button",{to:d,download:m.file,className:"btn btn-secondary btn-block w-100",onClick:()=>w(d,m.file),children:[" ","Descargar..."]})})]}),e.jsxs("div",{className:"form-group mb-2 col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Responsable"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,...t("client"),type:"text",className:"form-control  form-control-sm"})})]}),e.jsxs("div",{className:"form-group mb-2 col-md-4",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Creador del evento"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,...t("user"),type:"text",className:"form-control  form-control-sm"})}),e.jsx("input",{type:"hidden",...t("user_id")})]}),e.jsxs("div",{className:"form-group  mb-2 col-md-4 ",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Estado del evento"})}),e.jsx("div",{children:e.jsx("input",{disabled:!0,type:"text",className:"form-control form-control-sm",...t("status")})}),e.jsxs("div",{style:{display:`${h}`,border:"1px solid lightgray",borderRadius:"5px"},className:" px-2 pt-1",id:"changeStatus",children:[e.jsx("div",{className:"py-1",style:{cursor:"pointer"},onClick:()=>{i("NONE")},children:"x"}),e.jsxs("form",{onSubmit:f(g),children:[e.jsxs("select",{name:"",id:"",className:"form-select",...t("newStatus",{required:!0}),children:[e.jsx("option",{value:"",children:"Selecciona un estado"}),e.jsx("option",{value:"280",children:"Pendiente"}),e.jsx("option",{value:"281",children:"Cancelado"}),e.jsx("option",{value:"282",children:"Realizado"})]}),((x=b.newStatus)==null?void 0:x.type)=="required"&&e.jsx("p",{className:"errorMsg",children:"Este campo es requerido"}),e.jsx("button",{className:"btn btn-dark my-1 ",children:"Cambiar estado"})]})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("div",{children:e.jsx("label",{htmlFor:"",children:"Descripcion"})}),e.jsx("div",{children:e.jsx("textarea",{...t("description"),style:{maxHeight:"50px"},className:"form-control form-control-sm",rows:"2"})})]}),e.jsxs("div",{className:"my-3  d-flex flex-wrap justify-content-center align-items-center",children:[u.rol==272?"":e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn btn-success py-2 px-2",type:"button",onClick:E,children:"Editar"}),e.jsx("button",{className:"btn btn-warning mx-2 my-2 py-2 ",onClick:()=>{i("BLOCK")},children:"Cambiar estado"})]}),e.jsx(S,{className:"btn btn-info  mx-1 py-2",to:`/AllEvents/${p}`,children:"Ver eventos de este equipo"})]})]})})]})]})]})}export{B as default};

import{j as e,U as v,b as g,c as p,r as o}from"./index-583ba0dd.js";import{f as b}from"./file-download-ead365c6.js";import{e as E}from"./events.controller-323dd8ba.js";import{H as N}from"./Helmet-0065415a.js";import{V as F}from"./Volver-fefee8af.js";function y({event:s,index:t}){const d=async(n,m)=>{g.get(n,{responseType:"blob"}).then(i=>{b(i.data,m)}).catch(i=>{swal.fire("Este evento no tiene archivo para descargar","","info")})};return e.jsx("div",{className:t>1?"inactive my-2":" my-2",id:t,children:e.jsxs("div",{className:" event_container row flex-wrap ",children:[e.jsx("strong",{children:e.jsxs("h5",{children:["Evento: ",s.event_name]})}),e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Tipo de evento "})}),e.jsx("label",{htmlFor:"",children:s.event_type_name})]}),e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Importancia"})}),e.jsx("label",{htmlFor:"",children:s.importance_name})]})," ",e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Creador del evento"})}),e.jsx("label",{htmlFor:"",children:s.created_by_name})]})," ",e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Estado"})}),e.jsx("label",{htmlFor:"",children:s.status_name})]})," ",e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Razon "})}),e.jsx("label",{htmlFor:"",children:s.event_reason_name})]})," ",e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Fecha de realización "})}),e.jsx("label",{htmlFor:"",children:s.created_at})]})," ",e.jsxs("div",{className:"col-3 d-flex flex-column col-md-3 col-sm-3",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Descripcíon"})}),e.jsx("label",{htmlFor:"",children:s.description})]}),e.jsxs("div",{className:"col-3  col-md-3 col-sm-3 d-flex flex-column",children:[e.jsx("strong",{children:e.jsx("label",{htmlFor:"",children:"Archivo adjunto"})}),e.jsxs("button",{className:"btn btn-secondary btn-block w-50 btn-sm",onClick:()=>d(`${v}${s.file}`,s.file),children:[" ","Descargar..."]})]})]})})}function B(){const s=p(),[t,d]=o.useState([]),[n,m]=o.useState({}),[i,j]=o.useState(0),[r,x]=o.useState(1),[c,h]=o.useState(0);o.useEffect(()=>{async function a(){const l=await E(s.id);m(l.data[0]),d(l.data),j(Math.ceil(l.data.length/2))}a()},[]);const u=()=>{if(r<i){const a=c,l=c+1;document.getElementById(`${a}`).classList.add("inactive"),document.getElementById(`${l}`).classList.add("inactive"),h(l+1),x(r+1),document.getElementById(`${l+1}`).classList.remove("inactive"),document.getElementById(`${l+2}`).classList.remove("inactive")}},f=()=>{if(r>1){const a=c-1,l=c-2;document.getElementById(`${a}`).classList.remove("inactive"),document.getElementById(`${l}`).classList.remove("inactive"),h(l),x(r-1),document.getElementById(`${c}`).classList.toggle("inactive"),document.getElementById(`${c+1}`).classList.toggle("inactive")}};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"event_header d-flex justify-content-between",children:[e.jsx(N,{children:e.jsx("title",{children:"Eventos de equipo"})}),"Evento del equipo",e.jsx(F,{})]}),e.jsxs("div",{className:"d-flex flex-column px-3 py-1",children:[e.jsxs("div",{className:"d-flex  flex-column  ",children:[e.jsx("div",{className:"event_title",children:e.jsx("h2",{children:"Equipo"})}),e.jsxs("div",{className:"d-flex gap-3  w-100  flex-row justify-content-center ",children:[e.jsxs("div",{className:"form-group col-md-2",children:[e.jsx("label",{htmlFor:"",children:"Serial"}),e.jsx("input",{disabled:!0,type:"text",value:n&&n.serial,className:"form-control form-control-sm"})]}),e.jsxs("div",{className:"form-group  col-md-2",children:[e.jsx("label",{htmlFor:"",children:"Equipo"}),e.jsx("input",{disabled:!0,value:n&&n.name,type:"text",className:"form-control form-control-sm"})]})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"event_title",children:e.jsx("h2",{children:"Eventos"})}),t.length>0?e.jsx(e.Fragment,{children:e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex w-100 align-items-center justify-content-center",children:[e.jsx("button",{onClick:f,className:"btn mx-1",children:"Anterior"}),e.jsxs("label",{htmlFor:"",children:[r," de ",i]}),e.jsx("button",{onClick:u,className:"btn mx-1",children:"Siguiente"})]}),t.map((a,l)=>e.jsx(y,{event:t[l],index:l}))]})}):e.jsx(e.Fragment,{children:e.jsx("div",{children:"Este equipo no tiene eventos"})})]})]})]})}export{B as default};

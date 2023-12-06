import{d as B,r as s,j as e,L as v}from"./index-583ba0dd.js";import{H as D}from"./Helmet-0065415a.js";import{e as F,D as q,A as M,G as L}from"./Add-d8fe991f.js";import{V as A}from"./Volver-fefee8af.js";import{u as V}from"./index.esm-5dab2a19.js";import{c as H}from"./index.esm-45cd40b0.js";/* empty css            */import"./iconBase-8e0a2488.js";function I({name:c,id:l,value:d}){const o=B(),{reset:y,register:S,handleSubmit:m,formState:{errors:C}}=V(),x=t=>{b()},[h,u]=s.useState(d),[N,p]=s.useState(c);s.useEffect(()=>{p(c),u(d)},[d]);const b=async()=>{Swal.fire({title:"Estas Seguro ?",text:"No podrás revertir esta acción",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, editar!"}).then(async t=>{if(t.isConfirmed)try{(await F(l,{name:h})).status==200&&swal.fire("Editado correctamente","","success").then(()=>{o(0)})}catch(r){swal.fire("Tuvimos un error, intenta mas tarde","","error"),console.log(r)}})},k=async()=>{Swal.fire({title:"Estas Seguro ?",text:"No podrás revertir esta acción",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, eliminar!"}).then(async t=>{if(t.isConfirmed)try{(await q(l)).status==200&&swal.fire("Eliminado correctamente","","success").then(()=>{o(0)})}catch(r){swal.fire("Tuvimos un error, intenta mas tarde","","error"),console.log(r)}})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"back w-100 vh-100 d-none d-flex justify-content-center ",id:"addParam",children:e.jsxs("div",{className:"card   d-flex rounded py-4  align-items-center  formContainer",children:[e.jsx("div",{children:e.jsxs("h3",{children:["Editar ",c]})}),e.jsx("div",{children:e.jsxs("form",{className:"d-flex justify-content-center flex-column gap-3 align-items-center",onSubmit:m(x),children:[e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("label",{htmlFor:"",children:"Parametro"}),e.jsx("input",{type:"text",className:"form-control ",disabled:!0,value:N,onChange:t=>{p(t.target.value)}})]}),e.jsxs("div",{className:"d-flex flex-column",children:[e.jsx("label",{htmlFor:"",children:"Valor"}),e.jsx("input",{type:"text",className:"form-control ",value:h,onChange:t=>{u(t.target.value)}})]})]}),e.jsxs("div",{className:" d-flex gap-2",children:[e.jsx("button",{className:"btn btn-success",children:"Editar"}),e.jsx("button",{className:"btn btn-danger",type:"button",onClick:()=>{k()},children:"Eliminar"}),e.jsx("button",{type:"button",className:"btn btn-dark",onClick:()=>{document.getElementById("addParam").classList.add("d-none")},children:"Cancelar"})]})]})})]})})})}function W(){const[c,l]=s.useState([]),[d,o]=s.useState([]),[y,S]=s.useState([]),[m,C]=s.useState([]),[x,h]=s.useState([]),[u,N]=s.useState(""),[p,b]=s.useState(""),[k,t]=s.useState(""),r=async()=>{const i=(await L()).data,g=[],w=[],_=[],P=[];i.map(n=>{switch(n.paramtype_id){case 201:n.param_state==1&&g.push(n);break;case 203:n.param_state==1&&P.push(n);break;case 204:n.param_state==1&&_.push(n);break;case 208:n.param_state==1&&w.push(n);break}}),l(g),o(w),S(_),C(P)};s.useEffect(()=>{r(),document.querySelector("#addModal").classList.add("inactive")},[]);const E=(a,i)=>{h([a,i]),document.querySelector("#addModal").classList.remove("inactive")},j=(a,i,g)=>{N(a),b(i),t(g),document.getElementById("addParam").classList.remove("d-none")},f=({name:a,id:i})=>e.jsx(e.Fragment,{children:e.jsx("button",{className:"btn btn-dark px-2 py-2 my-1",style:{maxHeight:"44px"},onClick:()=>{E(a,i)},children:e.jsx(H,{size:"1.5rem"})})}),T=()=>{r()};return e.jsxs("div",{children:[e.jsx(D,{children:e.jsx("title",{children:"Parametros"})}),e.jsx(I,{name:u,id:p,value:k}),e.jsx(M,{param:x[0],val:x[1],OnSaving:T}),e.jsxs("div",{className:"event_header d-flex flex-align-items justify-content-between",children:["Administrar Parametros ",e.jsx(A,{})]}),e.jsxs("div",{className:"px-4 py-2",children:[e.jsx("div",{className:"text-center my-0 mt-1",children:e.jsxs("h4",{className:"my-0",children:[" ",e.jsx("strong",{children:"Selecciona uno para editar o borrar"})]})}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex align-items-center gap-1",children:[e.jsx("label",{className:"event_header my-2 ",children:e.jsx("strong",{children:"Marcas"})}),e.jsx("div",{className:"",children:e.jsx(f,{name:"Marcas",id:"201"})})]}),e.jsx("div",{className:"text-dark d-flex flex-wrap gap-2 px-3",children:c&&c.map(a=>e.jsx(e.Fragment,{children:e.jsx(v,{className:"",style:{textDecoration:"none"},onClick:()=>{j("Marca",a.id,a.name)},children:e.jsx("div",{className:"card text-dark bg-light mb-3 py-2 px-3 align-items-center rounded justify-content-evenly",children:a.name})})}))})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex align-items-center gap-1",children:[e.jsx("label",{className:"event_header my-2",children:e.jsx("strong",{children:"Tipo de equipo"})}),e.jsx("div",{className:"",children:e.jsx(f,{name:"Tipo de equipo",id:"208"})})]}),e.jsx("div",{className:"text-dark d-flex gap-2 px-3",children:d&&d.map(a=>e.jsx(e.Fragment,{children:e.jsx(v,{className:" ",style:{textDecoration:"none"},onClick:()=>{j("Tipo de equipo",a.id,a.name)},children:e.jsx("div",{className:"card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly",children:a.name})})}))})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex align-items-center gap-1",children:[e.jsx("label",{className:"event_header my-2",children:e.jsx("strong",{children:"Tipo de Ram"})}),e.jsx("div",{className:"",children:e.jsx(f,{name:"Tipo de ram",id:"204"})})]}),e.jsx("div",{className:"text-dark d-flex gap-2 px-3",children:y&&y.map(a=>e.jsx(e.Fragment,{children:e.jsx(v,{className:"",style:{textDecoration:"none"},onClick:()=>{j("Tipo de ram",a.id,a.name)},children:e.jsx("div",{className:"card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly",children:a.name})})}))})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex align-items-center gap-1",children:[e.jsx("label",{className:"event_header my-2",children:e.jsx("strong",{children:"Tipo de disco duro"})}),e.jsx("div",{className:"",children:e.jsx(f,{name:"Tipo de disco duro",id:"203"})})]}),e.jsx("div",{className:"text-dark d-flex gap-2 px-3",children:m&&m.map(a=>e.jsx(e.Fragment,{children:e.jsx(v,{className:" ",style:{textDecoration:"none"},onClick:()=>{j("Tipo de disco duro",a.id,a.name)},children:e.jsx("div",{className:"card text-dark bg-light mb-3 px-3 py-2 align-items-center rounded justify-content-evenly",children:a.name})})}))})]})]})]})}export{W as default};
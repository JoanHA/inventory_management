import{r as a,j as e}from"./index-cbb2da5c.js";import{h as c}from"./devices.controller-4a04237c.js";import l from"./Table-bfafe3c2.js";import{V as i}from"./Volver-547a6aaf.js";import{H as n}from"./Helmet-404090e4.js";import"./iconBase-03adfd0f.js";import"./index.esm-1d85e361.js";import"./index.esm-91cc0528.js";import"./jspdf.es.min-47936f58.js";function K(){const[r,o]=a.useState([]),t=[{header:"IMEI",accessorKey:"serial"},{header:"Descripción",accessorKey:"name"},{header:"Responsable",accessorKey:"responsible_name"},{header:"Fecha de compra",accessorKey:"bought_at"},{header:"Numero de linea",accessorKey:"phone"},{header:"Valor Final",accessorKey:"final_value"},{header:"Ubicacion",accessorKey:"location"},{header:"Estado",accessorKey:"status_name"}];return a.useEffect(()=>{(async()=>{try{const s=await c();o(s.data),console.log(s.data)}catch(s){console.log(s)}})()},[]),e.jsxs("div",{children:[e.jsx(n,{children:e.jsx("title",{children:"Celulares"})}),e.jsxs("div",{className:"event_header d-flex flex-row align-items-center justify-content-between",children:["Celulares asignados",e.jsx(i,{})]}),e.jsx("div",{className:"px-4 py-3",children:e.jsx(l,{data:r,columns:t,editType:"edit"})})]})}export{K as default};

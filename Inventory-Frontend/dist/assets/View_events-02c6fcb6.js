import{r as s,j as e}from"./index-cbb2da5c.js";import{b as i}from"./events.controller-f199cce7.js";import{H as n}from"./Helmet-404090e4.js";import c from"./Table-bfafe3c2.js";import"./iconBase-03adfd0f.js";import"./index.esm-1d85e361.js";import"./index.esm-91cc0528.js";import"./jspdf.es.min-47936f58.js";function _(){const[a,t]=s.useState([]);s.useEffect(()=>{(async()=>{const o=await i();t(o.data)})()},[]);const r=[{header:"Cambio",accessorKey:"name"},{header:"Tipo cambio",accessorKey:"event_type_name"},{header:"Equipo",accessorKey:"equip_name"},{header:"Razon ",accessorKey:"reason_name"},{header:"Responsable",accessorKey:"user_name"},{header:"Fecha realización",accessorKey:"created_at"}];return e.jsxs("div",{children:[e.jsx("div",{className:"event_header mb-2",children:"Cambios realizados"}),e.jsxs("div",{className:"px-5 table-responsive",children:[e.jsx(n,{children:e.jsx("title",{children:"Eventos"})}),e.jsx(c,{data:a,columns:r,editType:"view_event"})]})]})}export{_ as default};

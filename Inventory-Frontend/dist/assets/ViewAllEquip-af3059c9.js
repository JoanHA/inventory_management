import{r as a,j as e,L as i}from"./index-ff15ffff.js";import l from"./Table-00fd893e.js";import{f as c}from"./devices.controller-1016fee0.js";import{H as n}from"./Helmet-5b044e24.js";import"./iconBase-49c0322b.js";import"./index.esm-9f53b03a.js";import"./index.esm-93b6ba13.js";import"./jspdf.es.min-f229373b.js";function E(){const[r,o]=a.useState([]);a.useEffect(()=>{(async()=>{try{const s=await c();o(s.data)}catch(s){console.log(s)}})()},[]);const t=[{header:"Equipo",accessorKey:"name"},{header:"Modelo",accessorKey:"model"},{header:"Serial",accessorKey:"serial"},{header:"Marca",accessorKey:"paramName"},{header:"Estado",accessorKey:"statusName"},{header:"Responsable",accessorKey:"user_name"}];return e.jsxs(e.Fragment,{children:[e.jsx(n,{children:e.jsx("title",{children:"Equipos registrados"})}),e.jsx("div",{className:"event_header mb-2",children:"Equipos registrados"}),e.jsx(i,{className:"my-1 link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover px-5 ",to:"/cellphones",children:e.jsx("span",{className:"",children:"Celulares"})}),e.jsx("div",{className:"px-5  table-responsive",children:e.jsx(l,{data:r,columns:t,editType:"edit"})})]})}export{E as default};

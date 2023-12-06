import{b as t,U as s}from"./index-583ba0dd.js";const c=async()=>t.get(s+"api/utils"),r=async e=>t.get(s+`api/equip/${e}`),l=async()=>t.get(s+"api/equip"),u=async e=>t.get(s+`api/equip/historical/${e}`),p=async(e,i)=>t.put(s+`api/equip/${e}`,i),d=async e=>t.post(s+"api/equip",e).then(i=>{try{i.data.status==204&&Swal.fire({position:"center",icon:"success",title:"El equipo de registro exitosamente!",showConfirmButton:!0,timer:3e3}).then(()=>{location.reload()})}catch{Swal.fire({position:"center",icon:"error",title:"Lo sentimos tuvimos un error intenta mas tarde ",showConfirmButton:!0,timer:3e3})}}),m=e=>{const i=Swal.mixin({customClass:{confirmButton:"btn btn-danger mx-2",cancelButton:"btn btn-secondary "},buttonsStyling:!1});i.fire({title:"¿Estas seguro?",text:"Esta acción no se podrá revertir!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel!",reverseButtons:!0}).then(o=>{o.isConfirmed?t.delete(s+`api/equip/${e}`).then(n=>{console.log(n.data),n.data.status==404?i.fire("Lo sentimos !","No pudimos eliminar tu registro, revisa tu conexión.","info"):i.fire("Deleted!","El equipo ha sido eliminado con exito.","success").then(()=>{location.href="/equipments"})}):o.dismiss===Swal.DismissReason.cancel&&i.fire("Cancelado","Tu registro no se ha eliminado","info")})},f=async(e,i)=>t.post(s+`api/equip/addFiles/${e}`,i),g=async e=>t.get(s+`api/equip/files/${e}`),h=async e=>t.delete(s+`api/equip/files/${e}`),q=async()=>t.get(s+"api/equip/cellphones/all");export{h as a,c as b,d as c,u as d,r as e,l as f,g,q as h,m as o,f as s,p as u};

import axios from "axios";
import { URI } from "../../config";

export const getParameters = async () => axios.get(URI + "api/utils")
export const getOneDevice = async (id) =>  axios.get(URI + `api/equip/${id}`)
export const getAllDevices = async () => axios.get(URI+"api/equip");

export const downloadHistoric = async (id) => axios.get(URI+`api/equip/historical/${id}`)
//Obtener todos los colaboradores
export const getAllWorkers =  async ()=> axios.get(URI+`api/workers/`);
//Actulizar equipo
export const update = async (id, datos) => axios.put(URI + `api/equip/${id}`, datos)
//crear equipo
export const createEquip = async(values)=> axios.post(URI + "api/equip", values).then((res) => {

    try {
        if (res.data.status == 204) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "El equipo de registro exitosamente!",
              showConfirmButton: true,
              timer: 3000,
            }).then(() => {
                window.location.href ="/equipments"
            });
          }
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Lo sentimos tuvimos un error intenta mas tarde ",
            showConfirmButton: true,
            timer: 3000,
          })
    }

});
//eliminar eequipo
export const onDelete = (id)=>{

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-danger mx-2',
          cancelButton: 'btn btn-secondary '
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "Esta acción no se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
                 axios.delete(URI+`api/equip/${id}`).then(res =>{
                   console.log(res.data)
                    if(res.data.status == 404){
                        swalWithBootstrapButtons.fire(
                            'Lo sentimos !',
                            'No pudimos eliminar tu registro, revisa tu conexión.',
                          'info'
                        )
                    }else{
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'El equipo ha sido eliminado con exito.',
                            'success'
                          ).then(()=>{location.href="/equipments"})
                         
                    }
                 })
            
        
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu registro no se ha eliminado',
            'info'
          )
        }
      })
} 
//guardar archivos
export const saveFiles = async (id,files)=>axios.post(URI+ `api/equip/addFiles/${id}`,files)

//Traer archivos
export const getFiles = async (id) => axios.get(URI+`api/equip/files/${id}`)

//Eliminar archivos
export const deleteFiles = async (id) => axios.delete(URI+`api/equip/files/${id}`)


//Obtener todos los moviles
export const getAllMobiles =  async ()=> axios.get(URI+`api/equip/cellphones/all`);
import axios from "axios"
import { URI } from "../../../config"

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
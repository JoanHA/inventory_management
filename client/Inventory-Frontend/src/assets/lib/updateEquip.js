import axios from "axios";
import { URI } from "../../../config";
export const update = (id, datos) => {
  axios.put(URI + `api/equip/${id}`, datos).then((res) => {
    console.log(res);
    if(res.data.status == 200){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El equipo de registro exitosamente!',
            showConfirmButton: true,
            timer: 3000
          }).then(()=>{
                    location.href="/equipments"
  
          })
    }
  });
};

import axios from "axios";
import { URI } from "../../config";

export const saveParam = (data)=> axios.post(URI+"api/utils/params",data).then((res)=>{
            if(res.status == 200){
                Swal.fire({
                    position: 'center',
                    showClass: {
                        popup: 'Swal animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      },
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 2000
                  }).then(()=>{
                    document.querySelector("#addModal").classList.add("inactive");
                    document.querySelector("#valParam").value = ""
                    return true;
                  })
            }
})

export const editParams = async(id,data) => axios.put(URI + `api/utils/editParams/${id}`,data)
export const GetParams = async() => axios.get(URI + "api/utils")
export const DeleteParams = async(id) => axios.delete(URI + `api/utils/deleteParams/${id}`)
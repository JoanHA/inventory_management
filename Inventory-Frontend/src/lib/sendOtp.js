import axios from "axios";
import { URI } from "../../config";
import fileDownload from "js-file-download";
export const recoveryPassword =(data)=> axios.post(URI+"api/recover/send_recovery_email",data)

export  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      }).catch((err)=>{
        swal.fire(
            "Lo sentimos... No encontramos tu archivo",
            "",
            "error"
          );
      })
      ;
  }; 
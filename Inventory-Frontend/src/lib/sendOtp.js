import axios from "axios";
import { URI } from "../../config";

export const recoveryPassword =(data)=> axios.post(URI+"api/recover/send_recovery_email",data)
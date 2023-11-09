import axios from "axios";
import { URI } from "../../../../config";

export const getAll = (id)=> axios.get(`${URI}api/events/all/${id}`);
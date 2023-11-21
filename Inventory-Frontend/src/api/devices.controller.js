import axios from "axios";
import { URI } from "../../config";



export const getParameters = async () => axios.get(URI + "api/utils")
export const getOneDevice = async (id) =>  axios.get(URI + `api/equip/${id}`)

export const getAllDevices = async () => axios.get(URI+"api/equip");
export const downloadHistoric = async (id) => axios.get(URI+`api/equip/historical/${id}`)
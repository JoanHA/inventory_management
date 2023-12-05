import {URI} from "../../config.js"
import axios from "axios"

export const getWorkers = async ()=> axios.get(URI+`api/workers/`);
export const getOneWorker = async (id)=> axios.get(URI+`api/workers/${id}`);
export const createWorkers = async (data)=> axios.post(URI+`api/workers/`,data);
export const editWorkers = async (id,data)=> axios.put(URI+`api/workers/${id}`,data);
export const deleteWorkers = async (id)=> axios.delete(URI+`api/workers/${id}`);
export const saveMasiveWorkers = async (data)=>axios.post(URI+`api/worker/masive`,data)
export const getallequip= async (id)=>axios.get(URI+`api/workers/equip/${id}`)
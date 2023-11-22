import {URI} from "../../config.js"
import axios from "axios"

export const getWorkers = async ()=> axios.get(URI+`api/workers/`);
export const createWorkers = async ()=> axios.post(URI+`api/workers/`);
export const editWorkers = async (id)=> axios.put(URI+`api/workers/${id}`);
export const deleteWorkers = async (id)=> axios.delete(URI+`api/workers/${id}`);

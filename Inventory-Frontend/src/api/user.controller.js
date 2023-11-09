import axios from "axios"
import {URI} from "../../config.js"


export const getUsers =async (id)=> axios.get(`${URI}api/users/getUsers/${id}`);
export const getOne =async (id)=> axios.get(`${URI}api/users/${id}`);
export const deleteUser =async (id)=> axios.put(`${URI}api/users/${id}`); 
export const updateUser =async (id,data)=> axios.post(`${URI}api/users/${id}`,data); 
export const CreateUser =async (data)=> axios.post(`${URI}api/users/create`,data); 

export const changePassword = async (data) => axios.post(`${URI}api/utils/changePassword`,data)
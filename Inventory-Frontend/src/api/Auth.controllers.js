import axios from "axios"
import {URI} from "../../config.js"

export const Login = async (user)=>axios.post(`${URI}auth/login`,user)

export const SignUp = async (user)=> axios.post(`${URI}auth/register`, user)
export const verifyToken = async (token) => axios.post(`${URI}utils/verifyToken`,token)

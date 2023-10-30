import axios from "axios"
import {URI} from "../../config.js"  

export const getAllEvents = async() =>axios.get(`${URI}api/events`)
import axios from "axios"
import {URI} from "../../config.js"  

export const getAllEvents = async () =>axios.get(`${URI}api/events`);
export const getOneEvent = async (id) => axios.get(`${URI}api/events/${id}`);
 //event = id del evento y Status = estado del evento
export const updateStatus = async (event,Status) => axios.put(`${URI}api/events/${event}`,{Status});
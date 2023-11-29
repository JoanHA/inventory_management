import axios from "axios"
import {URI} from "../../config.js"  

export const getAllEvents = async () =>axios.get(`${URI}api/events`);
export const getOneEvent = async (id) => axios.get(`${URI}api/events/${id}`);
 //event = id del evento y Status = estado del evento
 export const updateStatus = async (event,Status) => axios.put(`${URI}api/events/${event}`,{Status});
 export const updateEvent = async (id,data) => axios.put(`${URI}api/events/edit/${id}`,{data});


export const getAll = (id)=> axios.get(`${URI}api/events/all/${id}`);
export const getDevice =async (id)=>axios.get(URI + `api/equip/${id}`)
export const getEvents_type = async ()=>axios.get(`${URI}api/utils/events_type`)
//This is not a event controller but this will help me to call the API to save the data from the excel

export const saveMasive = async (file) => axios.post(`${URI}api/masive`,file); 


import{b as t,U as e}from"./index-cbb2da5c.js";const p=async()=>t.get(`${e}api/events`),c=async s=>t.get(`${e}api/events/${s}`),i=async(s,a)=>t.put(`${e}api/events/${s}`,{Status:a}),v=async(s,a)=>t.put(`${e}api/events/edit/${s}`,{data:a}),o=s=>t.get(`${e}api/events/all/${s}`),$=async s=>t.get(e+`api/equip/${s}`),g=async()=>t.get(`${e}api/utils/events_type`),y=async s=>t.post(`${e}api/masive`,s);export{g as a,p as b,c,i as d,o as e,$ as g,y as s,v as u};

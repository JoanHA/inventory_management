import axios from "axios";
import {URI} from "../../config.js"

export const SaveEvent = async (data) =>axios.post(URI+`api/events`,data)
                                         
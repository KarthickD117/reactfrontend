import axios from "axios";
import { getSessionStorage } from "./sessionStorage";

const Cookies = require('js-cookie')
const baseurl = 'http://127.0.0.1:8000/'
export const axiosEvent = axios.create({baseURL:baseurl,
    headers : {
    "Authorization": `Bearer ${getSessionStorage('token')}`,
    "Content-Type": "application/x-www-form-urlencoded",
    }
}
)
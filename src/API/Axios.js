import axios from "axios";

const BASE_URL = 'https://localhost:7212';

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseUrl : BASE_URL,
    headers : {"Content-Type": "application/json"},
    withCredentials : true
})
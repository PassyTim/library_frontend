import axios from "axios";

const BASE_URL = fetchBaseUrl();

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseUrl : BASE_URL,
    headers : {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"},
    withCredentials : true,
})

function fetchBaseUrl () {
    if(process.env.NODE_ENV === 'production') {
        return "http://localhost:5000"
    }
    else {
        return "https://localhost:7212"
    }
}
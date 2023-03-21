//helper function 
import axios from "axios"


const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
})

export function makeRequest(url, options) {
  return api(url, options)
    .then(res => res.data)
    .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}
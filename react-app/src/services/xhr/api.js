import axios from "axios";
export const axiosRequest = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    headers: {
      Authorization : `Bearer ${localStorage.getItem("access_token")}`
      }
  });
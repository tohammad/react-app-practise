import axios from "axios";
import { HEADERS } from "./Constants";
export const getAllPosts = () => {
  return axios({
    method: "get",
    headers: HEADERS(),
    url: "https://jsonplaceholder.typicode.com/posts",
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const getPostDetails = (id) => {
  return axios({
    method: "get",
    headers: HEADERS(),
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

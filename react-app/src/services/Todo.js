import { axiosRequest } from "./xhr/api";
export const getTodos = async () => {
const response = await axiosRequest.get("/todos");
return response.data;
}


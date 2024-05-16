import { postRequest } from "../process";

const createApi = (body,id) => {
  return postRequest(`/userApi/create/${id}`,body); 
};

export { createApi };
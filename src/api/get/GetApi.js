import { getRequest } from "../process";

const getApi = (id) => {
  return getRequest(`/userApi/get/${id}`); 
};

export { getApi };
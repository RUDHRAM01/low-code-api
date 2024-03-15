import { getRequest } from "../process";

const getProjectByIdApi = (id) => {
  return getRequest(`/project/get/${id}`); 
};

export { getProjectByIdApi };
import { getRequest } from "../process";

const getProjectApi = () => {
  return getRequest(`/project/all`); 
};

export { getProjectApi };
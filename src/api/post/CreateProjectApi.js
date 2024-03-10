import { postRequest } from "../process";

const createProjectApi = (body) => {
  return postRequest(`/project/create`,body); 
};

export { createProjectApi };
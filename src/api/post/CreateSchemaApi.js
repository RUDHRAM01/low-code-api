import { postRequest } from "../process";

const createSchemaApi = (body,id) => {
  return postRequest(`/schema/create/${id}`,body); 
};

export { createSchemaApi };
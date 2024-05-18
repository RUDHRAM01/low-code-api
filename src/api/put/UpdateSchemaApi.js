import { putRequest } from "../process";

const updateSchemaApi = (body,id) => {
  return putRequest(`/schema/update/${id}`,body); 
};

export { updateSchemaApi };
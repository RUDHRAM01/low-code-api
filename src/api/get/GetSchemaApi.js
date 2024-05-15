import { getRequest } from "../process";

const getSchemaApi = (id) => {
  return getRequest(`/schema/get/${id}`); 
};

export { getSchemaApi };
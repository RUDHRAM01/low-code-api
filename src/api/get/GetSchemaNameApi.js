import { getRequest } from "../process";

const getSchemaNameApi = (id) => {
  return getRequest(`/schema/get/name/${id}`); 
};

export { getSchemaNameApi };
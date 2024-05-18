import { getRequest } from "../process";

const getSchemaByIdApi = (id) => {
  return getRequest(`/schema/getById/${id}`); 
};

export { getSchemaByIdApi };
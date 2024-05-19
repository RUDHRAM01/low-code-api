import { deleteRequest } from "../process";

const deleteSchemaApi = (id) => {
  return deleteRequest(`/schema/delete/${id}`); 
};

export { deleteSchemaApi };
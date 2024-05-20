import { deleteRequest } from "../process";

const deleteApi = (id) => {
  return deleteRequest(`/userApi/delete/${id}`); 
};

export { deleteApi };
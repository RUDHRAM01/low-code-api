import { postRequest } from "../process";

const LoginApi = (body) => {
  return postRequest(`/user/login`,body); 
};

export { LoginApi };
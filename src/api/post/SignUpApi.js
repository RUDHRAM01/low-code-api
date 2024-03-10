import { postRequest } from "../process";

const SignUpApi = (body) => {
  return postRequest(`/user/register`,body); 
};

export { SignUpApi };
import apis from "../../constants/apis";
import { requestPost } from "../../helpers/requestHandler";

export const requestDoLogin = (dataRequest) => {
  const headers = {};
  return requestPost(apis.LOGIN, dataRequest, headers);
};

export const requestDoSignup = (dataRequest) => {
  const headers = {};
  return requestPost(apis.SIGNUP, dataRequest, headers);
};

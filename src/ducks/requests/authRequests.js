import { sha256 } from "js-sha256";
import { handlePostRequest } from "../../utils/httpRequests";
import apis from "../apis";

export const requestDoLogin = (dataRequest) => {
  let { password } = dataRequest;
  password = sha256(password);
  dataRequest = { ...dataRequest, password };

  const headers = {};

  return handlePostRequest(apis.LOGIN, dataRequest, headers);
};

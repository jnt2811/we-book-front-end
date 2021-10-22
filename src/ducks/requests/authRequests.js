import { handlePostRequest } from "../../utils/httpRequests";
import apis from "../apis";

export const requestDoLogin = (dataRequest) => {
  let { password } = dataRequest;
  dataRequest = { ...dataRequest, password };

  const headers = {};

  return handlePostRequest(apis.LOGIN, dataRequest, headers);
};

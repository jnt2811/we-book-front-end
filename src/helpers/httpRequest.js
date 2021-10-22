import axios from "axios";
import { localKeys } from "../constants";
import { localGet } from "./localHelper";

const initHeaders = {
  Authorization: "bearer " + localGet(localKeys.ACCESS_TOKEN),
};

export const httpRequestPost = async (api, data, headers = initHeaders) => {
  try {
    return axios.post(api, data, { headers: headers, timeout: 5000 });
  } catch (error) {
    console.log("POST request error", error);
  }
};

export const httpRequestGet = async (api, headers = initHeaders) => {
  try {
    return axios.get(api, { headers: headers, timeout: 5000 });
  } catch (error) {
    console.log("GET request error", error);
  }
};

export const httpRequestPatch = async (api, data, headers = initHeaders) => {
  try {
    return axios.patch(api, data, { headers: headers, timeout: 5000 });
  } catch (error) {
    console.log("PATCH request error", error);
  }
};

export const httpRequestPut = async (api, data, headers = initHeaders) => {
  try {
    return axios.put(api, data, { headers: headers, timeout: 5000 });
  } catch (error) {
    console.log("PUT request error", error);
  }
};

export const httpRequestDelete = async (api, headers = initHeaders) => {
  try {
    return axios.delete(api, { headers: headers, timeout: 5000 });
  } catch (error) {
    console.log("DELETE request error", error);
  }
};

import { authCodes } from "../constants";

export const codeFormatter = (code = "") => {
  if (typeof code !== "string") return "";
  if (code.slice(0, 1) === "0") return authCodes[code];
  return "";
};

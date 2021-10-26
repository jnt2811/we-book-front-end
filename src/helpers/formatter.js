import { authCodes } from "../constants";
import moment from "moment";

export const codeFormatter = (code = "") => {
  if (typeof code !== "string") return "";
  if (code.slice(0, 1) === "0") return authCodes[code];
  return "";
};

export const momentToMilli = (moment) => moment.valueOf().toString();
export const momentToDate = (moment) => moment.format("DD/MM/YYYY");

export const milliToMoment = (milli) => {
  if (typeof milli === "number") milli.toString();
  return moment(milli, "x");
};
export const milliToDate = (milli) => {
  if (typeof milli === "number") milli.toString();
  return moment(milli, "x").format("DD/MM/YYYY");
};

export const phoneFormatter = (phone = "") => {};

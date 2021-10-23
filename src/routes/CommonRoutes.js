import { localKeys } from "../constants";
import { localGet } from "../helpers/localHandler";

export const PublicRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== null;
};

export const PrivateRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== null;
};

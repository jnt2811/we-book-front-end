import { localKeys, paths } from "../constants";
import { localGet } from "../helpers/localHandler";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== "";

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Redirect to={paths.HOME} /> : <Component {...props} />;
      }}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== "";

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to={paths.AUTH} />;
      }}
    />
  );
};

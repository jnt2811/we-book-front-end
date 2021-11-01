import { Switch, Redirect } from "react-router-dom";
import { paths } from "../constants";
import { Dashboard, Listings } from "../pages";
import { PrivateRoute } from "./RouteTypes";

export default function HostRoutes() {
  return (
    <Switch>
      <PrivateRoute exact path={paths.HOSTING} component={Dashboard} />
      <PrivateRoute exact path={paths.LISTINGS} component={Listings} />
      <Redirect from="*" to={paths.NOT_FOUND} />
    </Switch>
  );
}

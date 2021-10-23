import { Route, Switch, Redirect } from "react-router-dom";
import { paths } from "../constants";
import { Dashboard, Listings } from "../pages";

export default function HostRoutes() {
  return (
    <Switch>
      <Route exact path={paths.HOSTING} component={Dashboard} />
      <Route exact path={paths.LISTINGS} component={Listings} />
      <Redirect from="*" to={paths.NOT_FOUND} />
    </Switch>
  );
}

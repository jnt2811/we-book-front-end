import { BrowserRouter, Switch, Route } from "react-router-dom";
import { paths } from "../constants";
import { Header } from "../layouts";
import { Auth, NotFound } from "../pages";
import { AuthRoute, PrivateRoute } from "./CommonRoutes";
import GuestRoutes from "./GuestRoutes";
import HostRoutes from "./HostRoutes";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path={paths.NOT_FOUND} component={NotFound} />
        <AuthRoute exact path={paths.AUTH} component={Auth} />
        <PrivateRoute path={paths.HOSTING} component={HostRoutes} />
        <Route path={paths.HOME} component={GuestRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

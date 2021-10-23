import { BrowserRouter, Switch, Route } from "react-router-dom";
import { paths } from "../constants";
import { Header } from "../layouts";
import Auth from "../pages/common/Auth/Auth";
import GuestRoutes from "./GuestRoutes";
import HostRoutes from "./HostRoutes";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path={paths.AUTH} component={Auth} />
        <Route path={paths.HOSTING} component={HostRoutes} />
        <Route path={paths.HOME} component={GuestRoutes} />
      </Switch>
    </BrowserRouter>
  );
}

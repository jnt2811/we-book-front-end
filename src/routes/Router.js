import { BrowserRouter, Switch, Route } from "react-router-dom";
import { paths } from "../constants";
import { Header } from "../layouts";
import { GuestRoutes } from "./GuestRoutes";
import { HostRoutes } from "./HostRoutes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path={paths.HOSTING} component={HostRoutes} />
        <Route path={paths.HOME} component={GuestRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

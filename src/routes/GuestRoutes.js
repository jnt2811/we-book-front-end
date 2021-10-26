import { Switch, Redirect } from "react-router-dom";
import { paths } from "../constants";
import {
  Account,
  FavoriteList,
  Home,
  ListingView,
  Results,
  Trips,
} from "../pages";
import { PrivateRoute, PublicRoute } from "./RouteTypes";

export default function GuestRoutes() {
  return (
    <Switch>
      <PublicRoute exact path={paths.HOME} component={Home} />
      <PublicRoute exact path={paths.RESULTS} component={Results} />
      <PublicRoute path={paths.LISTING_VIEW_wId} component={ListingView} />
      <PrivateRoute exact path={paths.FAV_LIST} component={FavoriteList} />
      <PrivateRoute exact path={paths.ACCOUNT} component={Account} />
      <PrivateRoute exact path={paths.TRIPS} component={Trips} />
      <Redirect from="*" to={paths.NOT_FOUND} />
    </Switch>
  );
}

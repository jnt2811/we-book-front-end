import { Route, Switch, Redirect } from "react-router-dom";
import { paths } from "../constants";
import {
  Account,
  FavoriteList,
  Home,
  ListingView,
  Results,
  Trips,
} from "../pages";
import { PrivateRoute } from "./CommonRoutes";

export default function GuestRoutes() {
  return (
    <Switch>
      <Route exact path={paths.HOME} component={Home} />
      <Route exact path={paths.RESULTS} component={Results} />
      <Route path={paths.LISTING_VIEW_wId} component={ListingView} />
      <PrivateRoute exact path={paths.FAV_LIST} component={FavoriteList} />
      <PrivateRoute exact path={paths.ACCOUNT} component={Account} />
      <PrivateRoute exact path={paths.TRIPS} component={Trips} />
      <Redirect from="*" to={paths.NOT_FOUND} />
    </Switch>
  );
}

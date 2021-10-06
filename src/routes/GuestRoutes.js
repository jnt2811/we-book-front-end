import { Route, Switch } from "react-router-dom";
import { paths } from "../constants";
import {
  Account,
  FavoriteList,
  Home,
  ListingView,
  Results,
  Trips,
} from "../pages";

export const GuestRoutes = () => {
  return (
    <Switch>
      <Route exact path={paths.HOME} component={Home} />
      <Route exact path={paths.RESULTS} component={Results} />
      <Route path={paths.LISTING_VIEW_wId} component={ListingView} />
      <Route exact path={paths.FAV_LIST} component={FavoriteList} />
      <Route exact path={paths.ACCOUNT} component={Account} />
      <Route exact path={paths.TRIPS} component={Trips} />
    </Switch>
  );
};

import { Route, Switch } from "react-router-dom";
import { paths } from "../constances";
import { Home, ListingView, Results } from "../pages/guest";

export const GuestRoutes = () => {
  return (
    <Switch>
      <Route exact path={paths.HOME} component={Home} />
      <Route exact path={paths.RESULTS} component={Results} />
      <Route path={paths.LISTING_VIEW_wId} component={ListingView} />
    </Switch>
  );
};

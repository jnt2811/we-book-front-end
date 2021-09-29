const hosting = "/hosting";

const paths = {
  // Guest
  HOME: "/",
  RESULTS: "/results",
  LISTING_VIEW_wId: "/listing/:id",
  LISTING_VIEW_nId: "/listing/",
  TRIPS: "/trips",
  FAV_LIST: "/favorite-list",
  PROFILE: "/profile",
  ACCOUNT: "/account",

  // Host
  HOSTING: hosting,
  LISTINGS: hosting + "/listings",
  LISTING_EDIT_wId: hosting + "/listings/:id",
  LISTING_EDIT_nId: hosting + "/listings/",
  LISTING_NEW: hosting + "/listing-new",
  HISTORY: hosting + "/history",
};

export default paths;

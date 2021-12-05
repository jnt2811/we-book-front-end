const url = "https://we-book-back-end.herokuapp.com";
// const url = "http://localhost:5000";

const apis = {
  // api xác thực
  LOGIN: url + "/auth/login",
  SIGNUP: url + "/auth/signup",
  TOKEN: url + "/auth/token",

  // api tài khoản người dùng
  USER: url + "/user",

  // api nơi ở
  LISTING_GUEST: url + "/listing",
  LISTING_HOST: url + "/listing/host",
  Place: url + "/listing/place",

  //api chuyen di
  TRIPS_GUEST_UPCOMING: url + "/transaction/guest/upcoming",
  TRIPS_GUEST_PAST: url + "/transaction/guest/past",
};

export default apis;

// const url = "https://we-book-back-end.herokuapp.com";
const url = "http://localhost:5001";

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
  PLACE: url + "/listing/place",
  AMENITY: url + "/listing/amenity",
};

export default apis;

import { call, put, takeLatest } from "redux-saga/effects";
import { localKeys } from "../../constants";
import { doLogin, loginFail, loginSuccess } from "../slices/loginSlice";
import { doLogout } from "../slices/logoutSlice";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doLogout.type, handleLogout);
}

export function* handleLogin(action) {
  console.log("AuthSagas handleLogin action: " + JSON.stringify(action));

  try {
    const response = yield call(() => requestDoLogin(action.payload));

    console.log("AuthSagas handleLogin response: " + JSON.stringify(response));

    const { status } = response;

    if (status === "OK") {
      localStorage.setItem(localKeys.ACCESS_TOKEN, response.token);
      localStorage.setItem(localKeys.EXPIRES_TOKEN, response.expires);

      localStorage.setItem(localKeys.USER_PROFILE, JSON.stringify(response));

      yield put(
        loginSuccess({
          isOk: true,
          message: "Login success",
          userProfile: response.user,
        })
      );
    } else {
      yield put(
        loginFail({
          isOk: false,
          message: response.message,
          errorCode: response.errorCode,
          userProfile: {},
        })
      );
    }
  } catch (error) {
    console.log("Error: " + error.response);

    yield put(
      loginFail({
        isOk: false,
        message: error.response.data,
        userProfile: {},
      })
    );
  }
}

export function* handleLogout() {
  yield localStorage.removeItem(localKeys.ACCESS_TOKEN);
  window.location.reload();
}

import { call, put, takeLatest } from "redux-saga/effects";
import { localKeys } from "../../constants";
import { codeFormatter } from "../../helpers/formatter";
import { localRemove, localSet } from "../../helpers/localHandler";
import { requestDoLogin, requestDoSignup } from "../requests/authRequests";
import {
  doLogin,
  doLogout,
  loginFail,
  loginSuccess,
} from "../slices/loginSlice";
import { doSignup } from "../slices/signupSlice";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doSignup.type, handleSignup);
  yield takeLatest(doLogout.type, handleLogout);
}

export function* handleLogin(action) {
  try {
    const response = yield call(() => requestDoLogin(action.payload));

    const res = response.data;

    if (res.status) {
      localSet(localKeys.ACCESS_TOKEN, res.data.access_token);
      localSet(localKeys.REFRESH_TOKEN, res.data.refresh_token);

      yield put(
        loginSuccess({
          isOk: true,
          user: res.data.user_data,
        })
      );
    } else {
      yield put(
        loginFail({
          isOk: false,
          message: codeFormatter(res.code),
          user: {},
        })
      );
    }
  } catch (error) {
    console.log("Login Error", error);

    yield put(
      loginFail({
        isOk: false,
        message: error,
        user: {},
      })
    );
  }
}

export function* handleSignup(action) {
  try {
    const response = yield call(() => requestDoSignup(action.payload));

    const res = response.data;

    if (res.status) {
      localSet(localKeys.ACCESS_TOKEN, res.data.access_token);
      localSet(localKeys.REFRESH_TOKEN, res.data.refresh_token);

      yield put(
        loginSuccess({
          isOk: true,
          user: res.data.user_data,
        })
      );
    } else {
      yield put(
        loginFail({
          isOk: false,
          message: codeFormatter(res.code),
          user: {},
        })
      );
    }
  } catch (error) {
    console.log("Signup Error", error.response);

    yield put(
      loginFail({
        isOk: false,
        message: error.response,
        user: {},
      })
    );
  }
}

export function* handleLogout() {
  yield localRemove(localKeys.ACCESS_TOKEN);
  yield localRemove(localKeys.REFRESH_TOKEN);
  window.location.reload();
}

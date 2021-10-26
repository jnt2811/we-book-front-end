import { call, put, takeLatest } from "redux-saga/effects";
import { localKeys } from "../../constants";
import { codeFormatter } from "../../helpers/formatter";
import { localRemove, localSet } from "../../helpers/localHandler";
import {
  requestDoEditUser,
  requestDoGetUser,
  requestDoLogin,
  requestDoSignup,
} from "../requests/authRequests";
import {
  doLogin,
  doSignup,
  doLogout,
  authSuccess,
  authFail,
  doGetUser,
  doEditUser,
} from "../slices/authSlice";

export function* watchDoAuth() {
  yield takeLatest(doLogin.type, handleLogin);
  yield takeLatest(doSignup.type, handleSignup);
  yield takeLatest(doLogout.type, handleLogout);
  yield takeLatest(doGetUser.type, handleGetUser);
  yield takeLatest(doEditUser.type, handleEditUser);
}

export function* handleLogin(action) {
  try {
    const response = yield call(() => requestDoLogin(action.payload));

    const res = response.data;

    if (res.status) {
      const { access_token, refresh_token, user_data } = res.data;

      localSet(localKeys.ACCESS_TOKEN, access_token);
      localSet(localKeys.REFRESH_TOKEN, refresh_token);

      yield put(
        authSuccess({
          isOk: true,
          user: user_data,
        })
      );
    } else {
      yield put(
        authFail({
          isOk: false,
          message: codeFormatter(res.code),
          user: undefined,
        })
      );
    }
  } catch (error) {
    console.log("Login Error", error);

    yield put(
      authFail({
        isOk: false,
        message: error,
        user: undefined,
      })
    );
  }
}

export function* handleSignup(action) {
  try {
    const response = yield call(() => requestDoSignup(action.payload));

    const res = response.data;

    if (res.status) {
      const { access_token, refresh_token, user_data } = res.data;

      localSet(localKeys.ACCESS_TOKEN, access_token);
      localSet(localKeys.REFRESH_TOKEN, refresh_token);

      yield put(
        authSuccess({
          isOk: true,
          user: user_data,
        })
      );
    } else {
      yield put(
        authFail({
          isOk: false,
          message: codeFormatter(res.code),
          user: undefined,
        })
      );
    }
  } catch (error) {
    console.log("Signup Error", error.response);

    yield put(
      authFail({
        isOk: false,
        message: error.response,
        user: undefined,
      })
    );
  }
}

export function* handleLogout() {
  yield localRemove(localKeys.ACCESS_TOKEN);
  yield localRemove(localKeys.REFRESH_TOKEN);

  window.location.reload();
}

export function* handleGetUser() {
  try {
    const response = yield call(requestDoGetUser);

    const res = response.data;

    if (res.status) {
      const { user_data } = res.data;

      yield put(
        authSuccess({
          isOk: true,
          user: user_data,
        })
      );
    } else {
      yield put(
        authFail({
          isOk: false,
          message: "Get User Error",
          user: undefined,
        })
      );
    }
  } catch (error) {
    console.log("Get User Error", error.response);

    yield put(
      authFail({
        isOk: false,
        message: error.response,
        user: undefined,
      })
    );
  }
}

export function* handleEditUser(action) {
  try {
    const response = yield call(() => requestDoEditUser(action.payload));

    const res = response.data;

    if (res.status) {
      const { user_data } = res.data;

      yield put(
        authSuccess({
          isOk: true,
          message: codeFormatter("005"),
          user: user_data,
        })
      );
    } else {
      yield put(
        authFail({
          isOk: false,
          message: "Edit User Error",
          user: undefined,
        })
      );
    }
  } catch (error) {
    console.log("Edit User Error", error.response);

    yield put(
      authFail({
        isOk: false,
        message: error.response,
        user: undefined,
      })
    );
  }
}

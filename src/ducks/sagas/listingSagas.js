import { call, put, takeLatest } from "@redux-saga/core/effects";
import { requestDoGetPlace } from "../requests/listingRequests";
import { doGetPlace } from "../slices/listingSlice";

export function* watchDoAuth() {
  yield takeLatest(doGetPlace.type, handleGetPlace);
}

export function* handleGetPlace(action) {
  try {
    const response = yield call(() => requestDoGetPlace(action.payload));

    const res = response.data;

    if (res.status) {
      yield put();
      // authSuccess({
      //   isOk: true,
      //   user: user_data,
      // })
    } else {
      yield put();
      // authFail({
      //   isOk: false,
      //   message: codeFormatter(res.code),
      //   user: undefined,
      // })
    }
  } catch (error) {
    console.log("Get Place Error", error);

    yield put();
    // authFail({
    //   isOk: false,
    //   message: error,
    //   user: undefined,
    // })
  }
}

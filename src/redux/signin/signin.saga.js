import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import { loginApi } from "../../api/sdk/signin";
import { ERROR_LOGIN, LOGIN, SUCCESS_LOGIN, loginResponse } from "./signin.action";


// login
function* loginRequest(data) {
  let getData = yield loginApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(loginResponse(SUCCESS_LOGIN, getData.data));
  } else {
    yield put(loginResponse(ERROR_LOGIN, getData.data));
  }
}
export function* loginWatcher() {
  yield takeLatest(LOGIN, loginRequest);
}

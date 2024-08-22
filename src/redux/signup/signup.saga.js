import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import { registrationApi } from "../../api/sdk/signup";
import {
  ERROR_REGISTRATION,
  REGISTRATION,
  SUCCESS_REGISTRATION,
  registrationResponse,
} from "./signup.action";

// Registration
function* registrationRequest(data) {
  let getData = yield registrationApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(registrationResponse(SUCCESS_REGISTRATION, getData.data));
  } else {
    yield put(registrationResponse(ERROR_REGISTRATION, getData.data));
  }
}
export function* registrationWatcher() {
  yield takeLatest(REGISTRATION, registrationRequest);
}

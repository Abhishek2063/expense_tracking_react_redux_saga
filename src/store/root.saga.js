import { all } from "redux-saga/effects";
import { registrationWatcher } from "../redux/signup/signup.saga";

export function* rootSaga() {
  yield all([registrationWatcher()]);
}

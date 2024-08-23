import { all } from "redux-saga/effects";
import { registrationWatcher } from "../redux/signup/signup.saga";
import { loginWatcher } from "../redux/signin/signin.saga";
import { getRoleWatcher } from "../redux/role/role.saga";
import { getAllModuleWatcher } from "../redux/module/module.saga";

export function* rootSaga() {
  yield all([
    registrationWatcher(),
    loginWatcher(),
    getRoleWatcher(),
    getAllModuleWatcher(),
  ]);
}

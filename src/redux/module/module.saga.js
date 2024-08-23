import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import { getModuleApi } from "../../api/sdk/module";
import { ERROR_GET_ALL_MODULE, GET_ALL_MODULE, SUCCESS_GET_ALL_MODULE, getAllModuleResponse } from "./module.action";


// getAllModule
function* getAllModuleRequest(data) {
  let getData = yield getModuleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getAllModuleResponse(SUCCESS_GET_ALL_MODULE, getData.data));
  } else {
    yield put(getAllModuleResponse(ERROR_GET_ALL_MODULE, getData.data));
  }
}
export function* getAllModuleWatcher() {
  yield takeLatest(GET_ALL_MODULE, getAllModuleRequest);
}

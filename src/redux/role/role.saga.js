import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import { getRoleApi } from "../../api/sdk/role";
import { ERROR_GET_ROLE, GET_ROLE, SUCCESS_GET_ROLE, getRoleResponse } from "./role.action";


// getRole
function* getRoleRequest(data) {
  let getData = yield getRoleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getRoleResponse(SUCCESS_GET_ROLE, getData.data));
  } else {
    yield put(getRoleResponse(ERROR_GET_ROLE, getData.data));
  }
}
export function* getRoleWatcher() {
  yield takeLatest(GET_ROLE, getRoleRequest);
}

import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  createRoleApi,
  deleteRoleApi,
  getRoleApi,
  updateRoleApi,
} from "../../api/sdk/role";
import {
  CREATE_ROLE,
  DELETE_ROLE,
  ERROR_CREATE_ROLE,
  ERROR_DELETE_ROLE,
  ERROR_GET_ROLE,
  ERROR_UPDATE_ROLE,
  GET_ROLE,
  SUCCESS_CREATE_ROLE,
  SUCCESS_DELETE_ROLE,
  SUCCESS_GET_ROLE,
  SUCCESS_UPDATE_ROLE,
  UPDATE_ROLE,
  createRoleResponse,
  deleteRoleResponse,
  getRoleResponse,
  updateRoleResponse,
} from "./role.action";

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

// createRole
function* createRoleRequest(data) {
  let getData = yield createRoleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(createRoleResponse(SUCCESS_CREATE_ROLE, getData.data));
  } else {
    yield put(createRoleResponse(ERROR_CREATE_ROLE, getData.data));
  }
}
export function* createRoleWatcher() {
  yield takeLatest(CREATE_ROLE, createRoleRequest);
}

// updateRole
function* updateRoleRequest(data) {
  let getData = yield updateRoleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(updateRoleResponse(SUCCESS_UPDATE_ROLE, getData.data));
  } else {
    yield put(updateRoleResponse(ERROR_UPDATE_ROLE, getData.data));
  }
}
export function* updateRoleWatcher() {
  yield takeLatest(UPDATE_ROLE, updateRoleRequest);
}

// deleteRole
function* deleteRoleRequest(data) {
  let getData = yield deleteRoleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(deleteRoleResponse(SUCCESS_DELETE_ROLE, getData.data));
  } else {
    yield put(deleteRoleResponse(ERROR_DELETE_ROLE, getData.data));
  }
}
export function* deleteRoleWatcher() {
  yield takeLatest(DELETE_ROLE, deleteRoleRequest);
}

import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  createModuleApi,
  getModuleApi,
  updateModuleApi,
  updateModulePermissionApi,
} from "../../api/sdk/module";
import {
  CREATE_MODULE,
  ERROR_CREATE_MODULE,
  ERROR_GET_ALL_MODULE,
  ERROR_GET_ALL_MODULE_ROUTE,
  ERROR_UPDATE_MODULE,
  ERROR_UPDATE_MODULE_PERMISSION,
  GET_ALL_MODULE,
  GET_ALL_MODULE_ROUTE,
  SUCCESS_CREATE_MODULE,
  SUCCESS_GET_ALL_MODULE,
  SUCCESS_GET_ALL_MODULE_ROUTE,
  SUCCESS_UPDATE_MODULE,
  SUCCESS_UPDATE_MODULE_PERMISSION,
  UPDATE_MODULE,
  UPDATE_MODULE_PERMISSION,
  createModuleResponse,
  getAllModuleResponse,
  getAllModuleResponseRoute,
  updateModulePermissionResponse,
  updateModuleResponse,
} from "./module.action";

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

// createModule
function* createModuleRequest(data) {
  let getData = yield createModuleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(createModuleResponse(SUCCESS_CREATE_MODULE, getData.data));
  } else {
    yield put(createModuleResponse(ERROR_CREATE_MODULE, getData.data));
  }
}
export function* createModuleWatcher() {
  yield takeLatest(CREATE_MODULE, createModuleRequest);
}

// updateModulePermission
function* updateModulePermissionRequest(data) {
  let getData = yield updateModulePermissionApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(
      updateModulePermissionResponse(
        SUCCESS_UPDATE_MODULE_PERMISSION,
        getData.data
      )
    );
  } else {
    yield put(
      updateModulePermissionResponse(
        ERROR_UPDATE_MODULE_PERMISSION,
        getData.data
      )
    );
  }
}
export function* updateModulePermissionWatcher() {
  yield takeLatest(UPDATE_MODULE_PERMISSION, updateModulePermissionRequest);
}

// updateModule
function* updateModuleRequest(data) {
  let getData = yield updateModuleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(updateModuleResponse(SUCCESS_UPDATE_MODULE, getData.data));
  } else {
    yield put(updateModuleResponse(ERROR_UPDATE_MODULE, getData.data));
  }
}
export function* updateModuleWatcher() {
  yield takeLatest(UPDATE_MODULE, updateModuleRequest);
}


// getAllModuleRoute
function* getAllModuleRouteRequest(data) {
  let getData = yield getModuleApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getAllModuleResponseRoute(SUCCESS_GET_ALL_MODULE_ROUTE, getData.data));
  } else {
    yield put(getAllModuleResponseRoute(ERROR_GET_ALL_MODULE_ROUTE, getData.data));
  }
}
export function* getAllModuleRouteWatcher() {
  yield takeLatest(GET_ALL_MODULE_ROUTE, getAllModuleRouteRequest);
}
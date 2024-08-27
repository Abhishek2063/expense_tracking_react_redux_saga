import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  deleteUserApi,
  getAllUserApi,
  passwordUpdateUserApi,
  updateUserApi,
} from "../../api/sdk/user";
import {
  DELETE_USER,
  ERROR_DELETE_USER,
  ERROR_GET_ALL_USER,
  ERROR_PASSWORD_UPDATE_USER,
  ERROR_UPDATE_USER,
  GET_ALL_USER,
  PASSWORD_UPDATE_USER,
  SUCCESS_DELETE_USER,
  SUCCESS_GET_ALL_USER,
  SUCCESS_PASSWORD_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  UPDATE_USER,
  deleteUserResponse,
  getAllUserResponse,
  passwordUpdateUserResponse,
  updateUserResponse,
} from "./user.action";

// getAllUser
function* getAllUserRequest(data) {
  let getData = yield getAllUserApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getAllUserResponse(SUCCESS_GET_ALL_USER, getData.data));
  } else {
    yield put(getAllUserResponse(ERROR_GET_ALL_USER, getData.data));
  }
}
export function* getAllUserWatcher() {
  yield takeLatest(GET_ALL_USER, getAllUserRequest);
}

// updateUser
function* updateUserRequest(data) {
  let getData = yield updateUserApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(updateUserResponse(SUCCESS_UPDATE_USER, getData.data));
  } else {
    yield put(updateUserResponse(ERROR_UPDATE_USER, getData.data));
  }
}
export function* updateUserWatcher() {
  yield takeLatest(UPDATE_USER, updateUserRequest);
}

// deleteUser
function* deleteUserRequest(data) {
  let getData = yield deleteUserApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(deleteUserResponse(SUCCESS_DELETE_USER, getData.data));
  } else {
    yield put(deleteUserResponse(ERROR_DELETE_USER, getData.data));
  }
}
export function* deleteUserWatcher() {
  yield takeLatest(DELETE_USER, deleteUserRequest);
}

// passwordUpdateUser
function* passwordUpdateUserRequest(data) {
  let getData = yield passwordUpdateUserApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(
      passwordUpdateUserResponse(SUCCESS_PASSWORD_UPDATE_USER, getData.data)
    );
  } else {
    yield put(
      passwordUpdateUserResponse(ERROR_PASSWORD_UPDATE_USER, getData.data)
    );
  }
}
export function* passwordUpdateUserWatcher() {
  yield takeLatest(PASSWORD_UPDATE_USER, passwordUpdateUserRequest);
}

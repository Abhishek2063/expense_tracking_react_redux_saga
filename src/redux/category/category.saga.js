import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoryApi,
  updateCategoryApi,
} from "../../api/sdk/category";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  ERROR_CREATE_CATEGORY,
  ERROR_DELETE_CATEGORY,
  ERROR_GET_CATEGORY,
  ERROR_UPDATE_CATEGORY,
  GET_CATEGORY,
  SUCCESS_CREATE_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
  SUCCESS_GET_CATEGORY,
  SUCCESS_UPDATE_CATEGORY,
  UPDATE_CATEGORY,
  createCategoryResponse,
  deleteCategoryResponse,
  getCategoryResponse,
  updateCategoryResponse,
} from "./category.action";

// getCategory
function* getCategoryRequest(data) {
  let getData = yield getAllCategoryApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getCategoryResponse(SUCCESS_GET_CATEGORY, getData.data));
  } else {
    yield put(getCategoryResponse(ERROR_GET_CATEGORY, getData.data));
  }
}
export function* getCategoryWatcher() {
  yield takeLatest(GET_CATEGORY, getCategoryRequest);
}

// createCategory
function* createCategoryRequest(data) {
  let getData = yield createCategoryApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(createCategoryResponse(SUCCESS_CREATE_CATEGORY, getData.data));
  } else {
    yield put(createCategoryResponse(ERROR_CREATE_CATEGORY, getData.data));
  }
}
export function* createCategoryWatcher() {
  yield takeLatest(CREATE_CATEGORY, createCategoryRequest);
}

// updateCategory
function* updateCategoryRequest(data) {
  let getData = yield updateCategoryApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(updateCategoryResponse(SUCCESS_UPDATE_CATEGORY, getData.data));
  } else {
    yield put(updateCategoryResponse(ERROR_UPDATE_CATEGORY, getData.data));
  }
}
export function* updateCategoryWatcher() {
  yield takeLatest(UPDATE_CATEGORY, updateCategoryRequest);
}

// deleteCategory
function* deleteCategoryRequest(data) {
  let getData = yield deleteCategoryApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(deleteCategoryResponse(SUCCESS_DELETE_CATEGORY, getData.data));
  } else {
    yield put(deleteCategoryResponse(ERROR_DELETE_CATEGORY, getData.data));
  }
}
export function* deleteCategoryWatcher() {
  yield takeLatest(DELETE_CATEGORY, deleteCategoryRequest);
}

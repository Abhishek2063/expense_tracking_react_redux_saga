import { put, takeLatest } from "redux-saga/effects";
import _ from "lodash";
import {
  createExpenseApi,
  deleteExpenseApi,
  getAnnualChartApi,
  getCategoryWiseChartApi,
  getExpenseApi,
  getMonthlyChartApi,
  getTimeBasedChartApi,
  updateExpenseApi,
} from "../../api/sdk/expense";
import {
  CREATE_EXPENSES,
  DELETE_EXPENSES,
  ERROR_CREATE_EXPENSES,
  ERROR_DELETE_EXPENSES,
  ERROR_GET_ANNUAL_CHART,
  ERROR_GET_CATEGORY_WISE_CHART,
  ERROR_GET_EXPENSES,
  ERROR_GET_MONTHLY_CHART,
  ERROR_GET_TIME_BASED_CHART,
  ERROR_UPDATE_EXPENSES,
  GET_ANNUAL_CHART,
  GET_CATEGORY_WISE_CHART,
  GET_EXPENSES,
  GET_MONTHLY_CHART,
  GET_TIME_BASED_CHART,
  SUCCESS_CREATE_EXPENSES,
  SUCCESS_DELETE_EXPENSES,
  SUCCESS_GET_ANNUAL_CHART,
  SUCCESS_GET_CATEGORY_WISE_CHART,
  SUCCESS_GET_EXPENSES,
  SUCCESS_GET_MONTHLY_CHART,
  SUCCESS_GET_TIME_BASED_CHART,
  SUCCESS_UPDATE_EXPENSES,
  UPDATE_EXPENSES,
  createExpenseResponse,
  deleteExpenseResponse,
  getAnnualChartResponse,
  getCategoryWiseChartResponse,
  getExpenseResponse,
  getMonthlyChartResponse,
  getTimeBasedChartResponse,
  updateExpenseResponse,
} from "./expenses.action";

// getExpense
function* getExpenseRequest(data) {
  let getData = yield getExpenseApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getExpenseResponse(SUCCESS_GET_EXPENSES, getData.data));
  } else {
    yield put(getExpenseResponse(ERROR_GET_EXPENSES, getData.data));
  }
}
export function* getExpenseWatcher() {
  yield takeLatest(GET_EXPENSES, getExpenseRequest);
}

// createExpense
function* createExpenseRequest(data) {
  let getData = yield createExpenseApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(createExpenseResponse(SUCCESS_CREATE_EXPENSES, getData.data));
  } else {
    yield put(createExpenseResponse(ERROR_CREATE_EXPENSES, getData.data));
  }
}
export function* createExpenseWatcher() {
  yield takeLatest(CREATE_EXPENSES, createExpenseRequest);
}

// updateExpense
function* updateExpenseRequest(data) {
  let getData = yield updateExpenseApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(updateExpenseResponse(SUCCESS_UPDATE_EXPENSES, getData.data));
  } else {
    yield put(updateExpenseResponse(ERROR_UPDATE_EXPENSES, getData.data));
  }
}
export function* updateExpenseWatcher() {
  yield takeLatest(UPDATE_EXPENSES, updateExpenseRequest);
}

// deleteExpense
function* deleteExpenseRequest(data) {
  let getData = yield deleteExpenseApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(deleteExpenseResponse(SUCCESS_DELETE_EXPENSES, getData.data));
  } else {
    yield put(deleteExpenseResponse(ERROR_DELETE_EXPENSES, getData.data));
  }
}
export function* deleteExpenseWatcher() {
  yield takeLatest(DELETE_EXPENSES, deleteExpenseRequest);
}

// getCategoryWiseChart
function* getCategoryWiseChartRequest(data) {
  let getData = yield getCategoryWiseChartApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(
      getCategoryWiseChartResponse(
        SUCCESS_GET_CATEGORY_WISE_CHART,
        getData.data
      )
    );
  } else {
    yield put(
      getCategoryWiseChartResponse(ERROR_GET_CATEGORY_WISE_CHART, getData.data)
    );
  }
}
export function* getCategoryWiseChartWatcher() {
  yield takeLatest(GET_CATEGORY_WISE_CHART, getCategoryWiseChartRequest);
}

// getTimeBasedChart
function* getTimeBasedChartRequest(data) {
  let getData = yield getTimeBasedChartApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(
      getTimeBasedChartResponse(SUCCESS_GET_TIME_BASED_CHART, getData.data)
    );
  } else {
    yield put(
      getTimeBasedChartResponse(ERROR_GET_TIME_BASED_CHART, getData.data)
    );
  }
}
export function* getTimeBasedChartWatcher() {
  yield takeLatest(GET_TIME_BASED_CHART, getTimeBasedChartRequest);
}

// getAnnualChart
function* getAnnualChartRequest(data) {
  let getData = yield getAnnualChartApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getAnnualChartResponse(SUCCESS_GET_ANNUAL_CHART, getData.data));
  } else {
    yield put(getAnnualChartResponse(ERROR_GET_ANNUAL_CHART, getData.data));
  }
}
export function* getAnnualChartWatcher() {
  yield takeLatest(GET_ANNUAL_CHART, getAnnualChartRequest);
}

// getMonthlyChart
function* getMonthlyChartRequest(data) {
  let getData = yield getMonthlyChartApi(data);
  if (getData.success && _.has(getData, "data.data")) {
    yield put(getMonthlyChartResponse(SUCCESS_GET_MONTHLY_CHART, getData.data));
  } else {
    yield put(getMonthlyChartResponse(ERROR_GET_MONTHLY_CHART, getData.data));
  }
}
export function* getMonthlyChartWatcher() {
  yield takeLatest(GET_MONTHLY_CHART, getMonthlyChartRequest);
}

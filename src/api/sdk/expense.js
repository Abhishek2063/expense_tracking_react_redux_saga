import { request } from "../request/axios.request";
import { EXPENSE_API_URL } from "../routing/route";

// createExpense api
export async function createExpenseApi(data) {
  let userData = data.data;

  return request({
    url: EXPENSE_API_URL,
    method: "post",
    data: userData,
  });
}

// getExpense api
export async function getExpenseApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  const queryParams = {
    sort_by: userData?.sort_by || "created_at",
    order: userData?.order || "desc",
    skip: userData?.skip || "0",
  };
  return request({
    url: `${EXPENSE_API_URL}/${user_id}`,
    method: "get",
    data: userData,
    params: queryParams,
  });
}

// updateExpense api
export async function updateExpenseApi(data) {
  let userData = data.data;
  let expense_id = userData.expense_id;
  return request({
    url: `${EXPENSE_API_URL}/${expense_id}`,
    method: "put",
    data: userData,
  });
}

// deleteExpense api
export async function deleteExpenseApi(data) {
  let userData = data.data;
  let expense_id = userData.expense_id;
  return request({
    url: `${EXPENSE_API_URL}/${expense_id}`,
    method: "delete",
    data: userData,
  });
}

// getCategoryWiseChart api
export async function getCategoryWiseChartApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;

  return request({
    url: `${EXPENSE_API_URL}/chart/category-wise/${user_id}`,
    method: "get",
    data: userData,
  });
}

// getTimeBasedChart api
export async function getTimeBasedChartApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  const time_frame = userData.time_frame || "date";

  return request({
    url: `${EXPENSE_API_URL}/chart/time-based/${time_frame}/${user_id}`,
    method: "get",
    data: userData,
  });
}

// getAnnualChart api
export async function getAnnualChartApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;

  return request({
    url: `${EXPENSE_API_URL}/chart/annual/${user_id}`,
    method: "get",
    data: userData,
  });
}

// getMonthlyChart api
export async function getMonthlyChartApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  const queryParams = {
    year: userData?.year || null,
  };
  return request({
    url: `${EXPENSE_API_URL}/chart/monthly/${user_id}`,
    method: "get",
    data: userData,
    params: queryParams,
  });
}

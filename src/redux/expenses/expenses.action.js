// GET_EXPENSES
export const GET_EXPENSES = "GET_EXPENSES";
export const getExpense = (data) => ({ type: GET_EXPENSES, data });
export const SUCCESS_GET_EXPENSES = "SUCCESS_GET_EXPENSES";
export const ERROR_GET_EXPENSES = "ERROR_GET_EXPENSES";
export const getExpenseResponse = (type, data) => ({ type, data });

// CREATE_EXPENSES
export const CREATE_EXPENSES = "CREATE_EXPENSES";
export const createExpense = (data) => ({ type: CREATE_EXPENSES, data });
export const SUCCESS_CREATE_EXPENSES = "SUCCESS_CREATE_EXPENSES";
export const ERROR_CREATE_EXPENSES = "ERROR_CREATE_EXPENSES";
export const createExpenseResponse = (type, data) => ({ type, data });

// UPDATE_EXPENSES
export const UPDATE_EXPENSES = "UPDATE_EXPENSES";
export const updateExpense = (data) => ({ type: UPDATE_EXPENSES, data });
export const SUCCESS_UPDATE_EXPENSES = "SUCCESS_UPDATE_EXPENSES";
export const ERROR_UPDATE_EXPENSES = "ERROR_UPDATE_EXPENSES";
export const updateExpenseResponse = (type, data) => ({ type, data });

// DELETE_EXPENSES
export const DELETE_EXPENSES = "DELETE_EXPENSES";
export const deleteExpense = (data) => ({ type: DELETE_EXPENSES, data });
export const SUCCESS_DELETE_EXPENSES = "SUCCESS_DELETE_EXPENSES";
export const ERROR_DELETE_EXPENSES = "ERROR_DELETE_EXPENSES";
export const deleteExpenseResponse = (type, data) => ({ type, data });

// GET_CATEGORY_WISE_CHART
export const GET_CATEGORY_WISE_CHART = "GET_CATEGORY_WISE_CHART";
export const getCategoryWiseChart = (data) => ({
  type: GET_CATEGORY_WISE_CHART,
  data,
});
export const SUCCESS_GET_CATEGORY_WISE_CHART =
  "SUCCESS_GET_CATEGORY_WISE_CHART";
export const ERROR_GET_CATEGORY_WISE_CHART = "ERROR_GET_CATEGORY_WISE_CHART";
export const getCategoryWiseChartResponse = (type, data) => ({ type, data });

// GET_TIME_BASED_CHART
export const GET_TIME_BASED_CHART = "GET_TIME_BASED_CHART";
export const getTimeBasedChart = (data) => ({
  type: GET_TIME_BASED_CHART,
  data,
});
export const SUCCESS_GET_TIME_BASED_CHART = "SUCCESS_GET_TIME_BASED_CHART";
export const ERROR_GET_TIME_BASED_CHART = "ERROR_GET_TIME_BASED_CHART";
export const getTimeBasedChartResponse = (type, data) => ({ type, data });

// GET_ANNUAL_CHART
export const GET_ANNUAL_CHART = "GET_ANNUAL_CHART";
export const getAnnualChart = (data) => ({ type: GET_ANNUAL_CHART, data });
export const SUCCESS_GET_ANNUAL_CHART = "SUCCESS_GET_ANNUAL_CHART";
export const ERROR_GET_ANNUAL_CHART = "ERROR_GET_ANNUAL_CHART";
export const getAnnualChartResponse = (type, data) => ({ type, data });

// GET_MONTHLY_CHART
export const GET_MONTHLY_CHART = "GET_MONTHLY_CHART";
export const getMonthlyChart = (data) => ({ type: GET_MONTHLY_CHART, data });
export const SUCCESS_GET_MONTHLY_CHART = "SUCCESS_GET_MONTHLY_CHART";
export const ERROR_GET_MONTHLY_CHART = "ERROR_GET_MONTHLY_CHART";
export const getMonthlyChartResponse = (type, data) => ({ type, data });

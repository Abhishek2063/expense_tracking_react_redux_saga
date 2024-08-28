import {
  ERROR_CREATE_EXPENSES,
  ERROR_DELETE_EXPENSES,
  ERROR_GET_ANNUAL_CHART,
  ERROR_GET_CATEGORY_WISE_CHART,
  ERROR_GET_EXPENSES,
  ERROR_GET_MONTHLY_CHART,
  ERROR_GET_TIME_BASED_CHART,
  ERROR_UPDATE_EXPENSES,
  SUCCESS_CREATE_EXPENSES,
  SUCCESS_DELETE_EXPENSES,
  SUCCESS_GET_ANNUAL_CHART,
  SUCCESS_GET_CATEGORY_WISE_CHART,
  SUCCESS_GET_EXPENSES,
  SUCCESS_GET_MONTHLY_CHART,
  SUCCESS_GET_TIME_BASED_CHART,
  SUCCESS_UPDATE_EXPENSES,
} from "./expenses.action";
import { DEFAULT_STATE } from "./expenses.state";

export const expenseReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_GET_EXPENSES:
      const getExpenseData = action.data;
      return { ...state, getExpenseData };
    case ERROR_GET_EXPENSES:
      const errorgetExpenseData = action.data;
      return { ...state, getExpenseData: errorgetExpenseData };

    case SUCCESS_CREATE_EXPENSES:
      const createExpenseData = action.data;
      return { ...state, createExpenseData };
    case ERROR_CREATE_EXPENSES:
      const errorcreateExpenseData = action.data;
      return { ...state, createExpenseData: errorcreateExpenseData };

    case SUCCESS_UPDATE_EXPENSES:
      const updateExpenseData = action.data;
      return { ...state, updateExpenseData };
    case ERROR_UPDATE_EXPENSES:
      const errorupdateExpenseData = action.data;
      return { ...state, updateExpenseData: errorupdateExpenseData };

    case SUCCESS_DELETE_EXPENSES:
      const deleteExpenseData = action.data;
      return { ...state, deleteExpenseData };
    case ERROR_DELETE_EXPENSES:
      const errordeleteExpenseData = action.data;
      return { ...state, deleteExpenseData: errordeleteExpenseData };

    case SUCCESS_GET_CATEGORY_WISE_CHART:
      const getCategoryWiseChartData = action.data;
      return { ...state, getCategoryWiseChartData };
    case ERROR_GET_CATEGORY_WISE_CHART:
      const errorgetCategoryWiseChartData = action.data;
      return {
        ...state,
        getCategoryWiseChartData: errorgetCategoryWiseChartData,
      };

    case SUCCESS_GET_TIME_BASED_CHART:
      const getTimeBasedChartData = action.data;
      return { ...state, getTimeBasedChartData };
    case ERROR_GET_TIME_BASED_CHART:
      const errorgetTimeBasedChartData = action.data;
      return { ...state, getTimeBasedChartData: errorgetTimeBasedChartData };

    case SUCCESS_GET_ANNUAL_CHART:
      const getAnnualChartData = action.data;
      return { ...state, getAnnualChartData };
    case ERROR_GET_ANNUAL_CHART:
      const errorgetAnnualChartData = action.data;
      return { ...state, getAnnualChartData: errorgetAnnualChartData };

    case SUCCESS_GET_MONTHLY_CHART:
      const getMonthlyChartData = action.data;
      return { ...state, getMonthlyChartData };
    case ERROR_GET_MONTHLY_CHART:
      const errorgetMonthlyChartData = action.data;
      return { ...state, getMonthlyChartData: errorgetMonthlyChartData };

    default:
      return state;
  }
};

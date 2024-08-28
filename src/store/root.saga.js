import { all } from "redux-saga/effects";
import { registrationWatcher } from "../redux/signup/signup.saga";
import { loginWatcher } from "../redux/signin/signin.saga";
import {
  createRoleWatcher,
  deleteRoleWatcher,
  getRoleWatcher,
  updateRoleWatcher,
} from "../redux/role/role.saga";
import {
  createModuleWatcher,
  getAllModuleWatcher,
  updateModulePermissionWatcher,
  updateModuleWatcher,
} from "../redux/module/module.saga";
import {
  deleteUserWatcher,
  getAllUserWatcher,
  passwordUpdateUserWatcher,
  updateUserWatcher,
} from "../redux/user/user.saga";
import {
  createCategoryWatcher,
  deleteCategoryWatcher,
  getCategoryWatcher,
  updateCategoryWatcher,
} from "../redux/category/category.saga";
import {
  createExpenseWatcher,
  deleteExpenseWatcher,
  getAnnualChartWatcher,
  getCategoryWiseChartWatcher,
  getExpenseWatcher,
  getMonthlyChartWatcher,
  getTimeBasedChartWatcher,
  updateExpenseWatcher,
} from "../redux/expenses/expenses.saga";

export function* rootSaga() {
  yield all([
    registrationWatcher(),
    loginWatcher(),
    getRoleWatcher(),
    getAllModuleWatcher(),
    createModuleWatcher(),
    updateModulePermissionWatcher(),
    updateModuleWatcher(),
    createRoleWatcher(),
    updateRoleWatcher(),
    deleteRoleWatcher(),
    getAllUserWatcher(),
    updateUserWatcher(),
    deleteUserWatcher(),
    passwordUpdateUserWatcher(),
    getCategoryWatcher(),
    createCategoryWatcher(),
    updateCategoryWatcher(),
    deleteCategoryWatcher(),
    getExpenseWatcher(),
    createExpenseWatcher(),
    updateExpenseWatcher(),
    deleteExpenseWatcher(),
    getCategoryWiseChartWatcher(),
    getTimeBasedChartWatcher(),
    getAnnualChartWatcher(),
    getMonthlyChartWatcher(),
  ]);
}

// login
export const LOGIN = "LOGIN";
export const login_action = (data) => ({ type: LOGIN, data });
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const ERROR_LOGIN = "ERROR_LOGIN";
export const loginResponse = (type, data) => ({ type, data });

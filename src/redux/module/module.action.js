// GET_ALL_MODULE
export const GET_ALL_MODULE = "GET_ALL_MODULE";
export const getAllModule = (data) => ({ type: GET_ALL_MODULE, data });
export const SUCCESS_GET_ALL_MODULE = "SUCCESS_GET_ALL_MODULE";
export const ERROR_GET_ALL_MODULE = "ERROR_GET_ALL_MODULE";
export const getAllModuleResponse = (type, data) => ({ type, data });

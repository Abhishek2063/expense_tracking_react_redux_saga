// GET_ROLE
export const GET_ROLE = "GET_ROLE";
export const getRole = (data) => ({ type: GET_ROLE, data });
export const SUCCESS_GET_ROLE = "SUCCESS_GET_ROLE";
export const ERROR_GET_ROLE = "ERROR_GET_ROLE";
export const getRoleResponse = (type, data) => ({ type, data });

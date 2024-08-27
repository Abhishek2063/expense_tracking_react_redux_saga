// GET_ROLE
export const GET_ROLE = "GET_ROLE";
export const getRole = (data) => ({ type: GET_ROLE, data });
export const SUCCESS_GET_ROLE = "SUCCESS_GET_ROLE";
export const ERROR_GET_ROLE = "ERROR_GET_ROLE";
export const getRoleResponse = (type, data) => ({ type, data });

// CREATE_ROLE
export const CREATE_ROLE = "CREATE_ROLE";
export const createRole = (data) => ({ type: CREATE_ROLE, data });
export const SUCCESS_CREATE_ROLE = "SUCCESS_CREATE_ROLE";
export const ERROR_CREATE_ROLE = "ERROR_CREATE_ROLE";
export const createRoleResponse = (type, data) => ({ type, data });

// UPDATE_ROLE
export const UPDATE_ROLE = "UPDATE_ROLE";
export const updateRole = (data) => ({ type: UPDATE_ROLE, data });
export const SUCCESS_UPDATE_ROLE = "SUCCESS_UPDATE_ROLE";
export const ERROR_UPDATE_ROLE = "ERROR_UPDATE_ROLE";
export const updateRoleResponse = (type, data) => ({ type, data });

// DELETE_ROLE
export const DELETE_ROLE = "DELETE_ROLE";
export const deleteRole = (data) => ({ type: DELETE_ROLE, data });
export const SUCCESS_DELETE_ROLE = "SUCCESS_DELETE_ROLE";
export const ERROR_DELETE_ROLE = "ERROR_DELETE_ROLE";
export const deleteRoleResponse = (type, data) => ({ type, data });

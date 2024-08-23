// GET_ALL_MODULE
export const GET_ALL_MODULE = "GET_ALL_MODULE";
export const getAllModule = (data) => ({ type: GET_ALL_MODULE, data });
export const SUCCESS_GET_ALL_MODULE = "SUCCESS_GET_ALL_MODULE";
export const ERROR_GET_ALL_MODULE = "ERROR_GET_ALL_MODULE";
export const getAllModuleResponse = (type, data) => ({ type, data });

// CREATE_MODULE
export const CREATE_MODULE = "CREATE_MODULE";
export const createModule = (data) => ({ type: CREATE_MODULE, data });
export const SUCCESS_CREATE_MODULE = "SUCCESS_CREATE_MODULE";
export const ERROR_CREATE_MODULE = "ERROR_CREATE_MODULE";
export const createModuleResponse = (type, data) => ({ type, data });

// UPDATE_MODULE_PERMISSION
export const UPDATE_MODULE_PERMISSION = "UPDATE_MODULE_PERMISSION";
export const updateModulePermission = (data) => ({
  type: UPDATE_MODULE_PERMISSION,
  data,
});
export const SUCCESS_UPDATE_MODULE_PERMISSION =
  "SUCCESS_UPDATE_MODULE_PERMISSION";
export const ERROR_UPDATE_MODULE_PERMISSION = "ERROR_UPDATE_MODULE_PERMISSION";
export const updateModulePermissionResponse = (type, data) => ({ type, data });

// UPDATE_MODULE
export const UPDATE_MODULE = "UPDATE_MODULE";
export const updateModule = (data) => ({ type: UPDATE_MODULE, data });
export const SUCCESS_UPDATE_MODULE = "SUCCESS_UPDATE_MODULE";
export const ERROR_UPDATE_MODULE = "ERROR_UPDATE_MODULE";
export const updateModuleResponse = (type, data) => ({ type, data });

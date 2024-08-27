// GET_ALL_USER
export const GET_ALL_USER = "GET_ALL_USER";
export const getAllUser = (data) => ({ type: GET_ALL_USER, data });
export const SUCCESS_GET_ALL_USER = "SUCCESS_GET_ALL_USER";
export const ERROR_GET_ALL_USER = "ERROR_GET_ALL_USER";
export const getAllUserResponse = (type, data) => ({ type, data });

// UPDATE_USER
export const UPDATE_USER = "UPDATE_USER";
export const updateUser = (data) => ({ type: UPDATE_USER, data });
export const SUCCESS_UPDATE_USER = "SUCCESS_UPDATE_USER";
export const ERROR_UPDATE_USER = "ERROR_UPDATE_USER";
export const updateUserResponse = (type, data) => ({ type, data });

// DELETE_USER
export const DELETE_USER = "DELETE_USER";
export const deleteUser = (data) => ({ type: DELETE_USER, data });
export const SUCCESS_DELETE_USER = "SUCCESS_DELETE_USER";
export const ERROR_DELETE_USER = "ERROR_DELETE_USER";
export const deleteUserResponse = (type, data) => ({ type, data });

// PASSWORD_UPDATE_USER
export const PASSWORD_UPDATE_USER = "PASSWORD_UPDATE_USER";
export const passwordUpdateUser = (data) => ({
  type: PASSWORD_UPDATE_USER,
  data,
});
export const SUCCESS_PASSWORD_UPDATE_USER = "SUCCESS_PASSWORD_UPDATE_USER";
export const ERROR_PASSWORD_UPDATE_USER = "ERROR_PASSWORD_UPDATE_USER";
export const passwordUpdateUserResponse = (type, data) => ({ type, data });

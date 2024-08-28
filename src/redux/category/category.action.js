// CREATE_CATEGORY
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const createCategory = (data) => ({ type: CREATE_CATEGORY, data });
export const SUCCESS_CREATE_CATEGORY = "SUCCESS_CREATE_CATEGORY";
export const ERROR_CREATE_CATEGORY = "ERROR_CREATE_CATEGORY";
export const createCategoryResponse = (type, data) => ({ type, data });

// GET_CATEGORY
export const GET_CATEGORY = "GET_CATEGORY";
export const getCategory = (data) => ({ type: GET_CATEGORY, data });
export const SUCCESS_GET_CATEGORY = "SUCCESS_GET_CATEGORY";
export const ERROR_GET_CATEGORY = "ERROR_GET_CATEGORY";
export const getCategoryResponse = (type, data) => ({ type, data });

// UPDATE_CATEGORY
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const updateCategory = (data) => ({ type: UPDATE_CATEGORY, data });
export const SUCCESS_UPDATE_CATEGORY = "SUCCESS_UPDATE_CATEGORY";
export const ERROR_UPDATE_CATEGORY = "ERROR_UPDATE_CATEGORY";
export const updateCategoryResponse = (type, data) => ({ type, data });

// DELETE_CATEGORY
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const deleteCategory = (data) => ({ type: DELETE_CATEGORY, data });
export const SUCCESS_DELETE_CATEGORY = "SUCCESS_DELETE_CATEGORY";
export const ERROR_DELETE_CATEGORY = "ERROR_DELETE_CATEGORY";
export const deleteCategoryResponse = (type, data) => ({ type, data });
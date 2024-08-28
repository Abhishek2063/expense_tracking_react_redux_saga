import {
  ERROR_CREATE_CATEGORY,
  ERROR_DELETE_CATEGORY,
  ERROR_GET_CATEGORY,
  ERROR_UPDATE_CATEGORY,
  SUCCESS_CREATE_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
  SUCCESS_GET_CATEGORY,
  SUCCESS_UPDATE_CATEGORY,
} from "./category.action";
import { DEFAULT_STATE } from "./category.state";

export const categoryReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_CREATE_CATEGORY:
      const createCategoryData = action.data;
      return { ...state, createCategoryData };
    case ERROR_CREATE_CATEGORY:
      const errorcreateCategoryData = action.data;
      return { ...state, createCategoryData: errorcreateCategoryData };

    case SUCCESS_GET_CATEGORY:
      const getCategoryData = action.data;
      return { ...state, getCategoryData };
    case ERROR_GET_CATEGORY:
      const errorgetCategoryData = action.data;
      return { ...state, getCategoryData: errorgetCategoryData };

    case SUCCESS_UPDATE_CATEGORY:
      const updateCategoryData = action.data;
      return { ...state, updateCategoryData };
    case ERROR_UPDATE_CATEGORY:
      const errorupdateCategoryData = action.data;
      return { ...state, updateCategoryData: errorupdateCategoryData };

    case SUCCESS_DELETE_CATEGORY:
      const deleteCategoryData = action.data;
      return { ...state, deleteCategoryData };
    case ERROR_DELETE_CATEGORY:
      const errordeleteCategoryData = action.data;
      return { ...state, deleteCategoryData: errordeleteCategoryData };

    default:
      return state;
  }
};

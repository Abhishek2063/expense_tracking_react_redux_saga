import {
  ERROR_CREATE_MODULE,
  ERROR_GET_ALL_MODULE,
  ERROR_GET_ALL_MODULE_ROUTE,
  ERROR_UPDATE_MODULE,
  ERROR_UPDATE_MODULE_PERMISSION,
  SUCCESS_CREATE_MODULE,
  SUCCESS_GET_ALL_MODULE,
  SUCCESS_GET_ALL_MODULE_ROUTE,
  SUCCESS_UPDATE_MODULE,
  SUCCESS_UPDATE_MODULE_PERMISSION,
} from "./module.action";
import { DEFAULT_STATE } from "./module.state";

export const moduleReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_GET_ALL_MODULE:
      const getAllModuleData = action.data;
      return { ...state, getAllModuleData };
    case ERROR_GET_ALL_MODULE:
      const errorgetAllModuleData = action.data;
      return { ...state, getAllModuleData: errorgetAllModuleData };

    case SUCCESS_CREATE_MODULE:
      const createModuleData = action.data;
      return { ...state, createModuleData };
    case ERROR_CREATE_MODULE:
      const errorcreateModuleData = action.data;
      return { ...state, createModuleData: errorcreateModuleData };

    case SUCCESS_UPDATE_MODULE_PERMISSION:
      const updateModulePermissionData = action.data;
      return { ...state, updateModulePermissionData };
    case ERROR_UPDATE_MODULE_PERMISSION:
      const errorupdateModulePermissionData = action.data;
      return {
        ...state,
        updateModulePermissionData: errorupdateModulePermissionData,
      };

    case SUCCESS_UPDATE_MODULE:
      const updateModuleData = action.data;
      return { ...state, updateModuleData };
    case ERROR_UPDATE_MODULE:
      const errorupdateModuleData = action.data;
      return { ...state, updateModuleData: errorupdateModuleData };

    case SUCCESS_GET_ALL_MODULE_ROUTE:
      const getAllModuleRouteData = action.data;
      return { ...state, getAllModuleRouteData };
    case ERROR_GET_ALL_MODULE_ROUTE:
      const errorgetAllModuleRouteData = action.data;
      return { ...state, getAllModuleRouteData: errorgetAllModuleRouteData };

    default:
      return state;
  }
};

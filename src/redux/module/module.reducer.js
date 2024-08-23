import { ERROR_GET_ALL_MODULE, SUCCESS_GET_ALL_MODULE } from "./module.action";
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

    default:
      return state;
  }
};

import {
  ERROR_CREATE_ROLE,
  ERROR_DELETE_ROLE,
  ERROR_GET_ROLE,
  ERROR_UPDATE_ROLE,
  SUCCESS_CREATE_ROLE,
  SUCCESS_DELETE_ROLE,
  SUCCESS_GET_ROLE,
  SUCCESS_UPDATE_ROLE,
} from "./role.action";
import { DEFAULT_STATE } from "./role.state";

export const roleReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_GET_ROLE:
      const getRoleData = action.data;
      return { ...state, getRoleData };
    case ERROR_GET_ROLE:
      const errorgetRoleData = action.data;
      return { ...state, getRoleData: errorgetRoleData };

    case SUCCESS_CREATE_ROLE:
      const createRoleData = action.data;
      return { ...state, createRoleData };
    case ERROR_CREATE_ROLE:
      const errorcreateRoleData = action.data;
      return { ...state, createRoleData: errorcreateRoleData };

    case SUCCESS_UPDATE_ROLE:
      const updateRoleData = action.data;
      return { ...state, updateRoleData };
    case ERROR_UPDATE_ROLE:
      const errorupdateRoleData = action.data;
      return { ...state, updateRoleData: errorupdateRoleData };

    case SUCCESS_DELETE_ROLE:
      const deleteRoleData = action.data;
      return { ...state, deleteRoleData };
    case ERROR_DELETE_ROLE:
      const errordeleteRoleData = action.data;
      return { ...state, deleteRoleData: errordeleteRoleData };

    default:
      return state;
  }
};

import { ERROR_GET_ROLE, SUCCESS_GET_ROLE } from "./role.action";
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

    default:
      return state;
  }
};

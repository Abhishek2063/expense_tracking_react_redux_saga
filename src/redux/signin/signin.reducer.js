import { ERROR_LOGIN, SUCCESS_LOGIN } from "./signin.action";
import { DEFAULT_STATE } from "./signin.state";

export const loginReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
      const loginData = action.data;
      return { ...state, loginData };
    case ERROR_LOGIN:
      const errorLoginData = action.data;
      return { ...state, loginData: errorLoginData };

    default:
      return state;
  }
};

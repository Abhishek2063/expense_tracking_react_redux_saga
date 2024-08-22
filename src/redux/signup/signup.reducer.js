import { ERROR_REGISTRATION, SUCCESS_REGISTRATION } from "./signup.action";
import { DEFAULT_STATE } from "./signup.state";

export const signupReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_REGISTRATION:
      const registerData = action.data;
      return { ...state, registerData };
    case ERROR_REGISTRATION:
      const errorRegisterData = action.data;
      return { ...state, registerData: errorRegisterData };

    default:
      return state;
  }
};

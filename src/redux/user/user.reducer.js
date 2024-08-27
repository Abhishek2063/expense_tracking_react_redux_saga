import {
  ERROR_DELETE_USER,
  ERROR_GET_ALL_USER,
  ERROR_PASSWORD_UPDATE_USER,
  ERROR_UPDATE_USER,
  SUCCESS_DELETE_USER,
  SUCCESS_GET_ALL_USER,
  SUCCESS_PASSWORD_UPDATE_USER,
  SUCCESS_UPDATE_USER,
} from "./user.action";
import { DEFAULT_STATE } from "./user.state";

export const userReducer = (
  state = DEFAULT_STATE,
  action = {
    type: {},
    data: {},
  }
) => {
  switch (action.type) {
    case SUCCESS_GET_ALL_USER:
      const getAllUserData = action.data;
      return { ...state, getAllUserData };
    case ERROR_GET_ALL_USER:
      const errorgetAllUserData = action.data;
      return { ...state, getAllUserData: errorgetAllUserData };

    case SUCCESS_UPDATE_USER:
      const updateUserData = action.data;
      return { ...state, updateUserData };
    case ERROR_UPDATE_USER:
      const errorupdateUserData = action.data;
      return { ...state, updateUserData: errorupdateUserData };

    case SUCCESS_DELETE_USER:
      const deleteUserData = action.data;
      return { ...state, deleteUserData };
    case ERROR_DELETE_USER:
      const errordeleteUserData = action.data;
      return { ...state, deleteUserData: errordeleteUserData };

    case SUCCESS_PASSWORD_UPDATE_USER:
      const passwordUpdateUser = action.data;
      return { ...state, passwordUpdateUser };
    case ERROR_PASSWORD_UPDATE_USER:
      const errorpasswordUpdateUser = action.data;
      return { ...state, passwordUpdateUser: errorpasswordUpdateUser };

    default:
      return state;
  }
};

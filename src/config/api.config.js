import { getToken, getVerifyToken } from "../storage/tokens";

export let config = () => {
  let withOutAuthconfig, authConfig;
  authConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",

      Authorization: `Bearer ${getToken() ? getToken() : getVerifyToken()}`,
    },
  };
  withOutAuthconfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return getToken() || getVerifyToken() ? authConfig : withOutAuthconfig;
};

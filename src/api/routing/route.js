import { API_URL } from "../../config/config";

const URL = (uri) => `${API_URL}${uri}`;

export const REGISTRATION = URL("/api/users");
export const LOGIN = URL("/api/auth/login");
export const GET_ROLE_API_URL = URL("/api/role");
export const GET_ALL_MODULE_LIST = URL("/api/module")



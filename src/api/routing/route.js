import { API_URL } from "../../config/config";

const URL = (uri) => `${API_URL}${uri}`;

export const REGISTRATION = URL("/api/users");
export const LOGIN = URL("/api/auth/login");
export const MODULE_API_URL = URL("/api/module")
export const ROLE_API_URL = URL("/api/role")
export const USER_API_URL = URL("/api/users")






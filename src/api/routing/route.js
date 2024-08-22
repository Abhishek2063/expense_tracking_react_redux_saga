import { API_URL } from "../../config/config";

const URL = (uri) => `${API_URL}${uri}`;

export const REGISTRATION = URL("/users/create");

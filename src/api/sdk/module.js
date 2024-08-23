import { request } from "../request/axios.request";
import { MODULE_API_URL } from "../routing/route";
// getModule api
export async function getModuleApi(data) {
  let userData = data.data;
  return request({
    url: `${MODULE_API_URL}/${userData.role_id}`,
    method: "get",
    data: userData,
  });
}

// createModule api
export async function createModuleApi(data) {
  let userData = data.data;
  return request({
    url: `${MODULE_API_URL}`,
    method: "post",
    data: userData,
  });
}

export async function updateModulePermissionApi(data) {
  let userData = data.data;

  return request({
    url: `${MODULE_API_URL}/permission/${userData.role_id}/${userData.module_id}`,
    method: "put",
    data: userData,
  });
}

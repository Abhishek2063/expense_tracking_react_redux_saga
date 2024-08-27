import { request } from "../request/axios.request";
import { ROLE_API_URL } from "../routing/route";
// getRole api
export async function getRoleApi(data) {
  let userData = data.data;
  const queryParams = {
    sort_by: userData?.sort_by || "created_at",
    order: userData?.order || "desc",
    skip: userData?.skip || "0",
  };
  return request({
    url: ROLE_API_URL,
    method: "get",
    data: userData,
    params: queryParams,
  });
}

// createRole api
export async function createRoleApi(data) {
  let userData = data.data;

  return request({
    url: ROLE_API_URL,
    method: "post",
    data: userData,
  });
}

// updateRole api
export async function updateRoleApi(data) {
  let userData = data.data;
  let role_id = userData.role_id;
  return request({
    url: `${ROLE_API_URL}/${role_id}`,
    method: "put",
    data: userData,
  });
}

// deleteRole api
export async function deleteRoleApi(data) {
  let userData = data.data;
  let role_id = userData.role_id;
  return request({
    url: `${ROLE_API_URL}/${role_id}`,
    method: "delete",
    data: userData,
  });
}

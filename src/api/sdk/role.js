import { request } from "../request/axios.request";
import { GET_ROLE_API_URL } from "../routing/route";
// getRole api
export async function getRoleApi(data) {
  let userData = data.data;
  const queryParams = {
    sort_by: userData?.sort_by || "created_at",
    order: userData?.order || "desc",
    skip: userData?.skip || "0",
  };
  return request({
    url: GET_ROLE_API_URL,
    method: "get",
    data: userData,
    params: queryParams,
  });
}

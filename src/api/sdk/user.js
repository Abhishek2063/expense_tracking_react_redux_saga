import { request } from "../request/axios.request";
import { USER_API_URL } from "../routing/route";
// getAllUser api
export async function getAllUserApi(data) {
  let userData = data.data;
  const queryParams = {
    sort_by: userData?.sort_by || "created_at",
    order: userData?.order || "desc",
    skip: userData?.skip || "0",
  };
  return request({
    url: USER_API_URL,
    method: "get",
    data: userData,
    params: queryParams,
  });
}

// updateUser api
export async function updateUserApi(data) {
  let userData = data.data;
  let user_id = userData.user_id;
  return request({
    url: `${USER_API_URL}/${user_id}`,
    method: "put",
    data: userData,
  });
}

// deleteUser api
export async function deleteUserApi(data) {
  let userData = data.data;
  let user_id = userData.user_id;
  return request({
    url: `${USER_API_URL}/${user_id}`,
    method: "delete",
    data: userData,
  });
}

// passwordUpdateUser api
export async function passwordUpdateUserApi(data) {
  let userData = data.data;
  let user_id = userData.user_id;
  return request({
    url: `${USER_API_URL}/password_update/${user_id}`,
    method: "put",
    data: userData,
  });
}

import { request } from "../request/axios.request";
import { CATEGORY_API_URL } from "../routing/route";

// createCategory api
export async function createCategoryApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  return request({
    url: `${CATEGORY_API_URL}/${user_id}`,
    method: "post",
    data: userData,
  });
}

// getAllCategory api
export async function getAllCategoryApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  const queryParams = {
    sort_by: userData?.sort_by || "created_at",
    order: userData?.order || "desc",
    skip: userData?.skip || null,
    limit: userData?.limit || null,
    filter_search: userData?.filter_search || null,
  };
  return request({
    url: `${CATEGORY_API_URL}/${user_id}`,
    method: "get",
    data: userData,
    params: queryParams,
  });
}

// updateCategory api
export async function updateCategoryApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  const category_id = userData.category_id;

  return request({
    url: `${CATEGORY_API_URL}/${user_id}/${category_id}`,
    method: "put",
    data: userData,
  });
}

// deleteCategory api
export async function deleteCategoryApi(data) {
  let userData = data.data;
  const user_id = userData.user_id;
  const category_id = userData.category_id;

  return request({
    url: `${CATEGORY_API_URL}/${user_id}/${category_id}`,
    method: "delete",
    data: userData,
  });
}

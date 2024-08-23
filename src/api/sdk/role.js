
import { request } from '../request/axios.request';
import { GET_ROLE_API_URL } from '../routing/route';
// getRole api
export async function getRoleApi(data) {
    let userData = data.data;
    return request({
      url: GET_ROLE_API_URL,
      method: "get",
      data: userData,
    });
  }
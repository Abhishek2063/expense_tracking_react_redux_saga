
import { request } from '../request/axios.request';
import { GET_ALL_MODULE_LIST } from '../routing/route';
// getModule api
export async function getModuleApi(data) {
    let userData = data.data;
    return request({
      url: `${GET_ALL_MODULE_LIST}/${userData.role_id}`,
      method: "get",
      data: userData,
    });
  }
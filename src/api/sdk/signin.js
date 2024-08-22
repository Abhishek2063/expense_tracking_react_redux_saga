
import { request } from '../request/axios.request';
import { LOGIN } from '../routing/route';
// login api
export async function loginApi(data) {
    let userData = data.data;
    return request({
      url: LOGIN,
      method: "post",
      data: userData,
    });
  }

import { REGISTRATION } from '../routing/route';
import { request } from '../request/axios.request';
// registration api
export async function registrationApi(data) {
    let userData = data.data;
    return request({
      url: REGISTRATION,
      method: "post",
      data: userData,
    });
  }
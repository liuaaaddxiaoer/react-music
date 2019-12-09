import http from './index'
import * as URL from './url'

export default {

  /**
   *手机登录
   *
   * @param {*} [params={}]
   * @returns
   */
  loginPhone(params = {}) {
    return http(URL.LOGIN_PHONE, params)
  },

}
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

  /**
   *搜索
   *
   * @param {*} [params={}]
   * @returns
   */
  search(params = {}, isHot = false) {
    return http(isHot ? URL.SEARCH : URL.SEARCH_HOT, { type: 'mobile', ...params }, 'GET')
  }
}
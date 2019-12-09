import axios from 'axios'
import {BASE_URL} from './url'

axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 1500



export default (url, params = {}, method = 'POST', config = {}) => {
    return new Promise((resolve, reject) => {
        axios.request({
            url: url,
            method: method,
            params: method === 'POST' ? null : params,
            data: params,
            ...config
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.message)
        })
    })
}
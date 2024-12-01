import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.platform = 'h5'
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }
  Toast.loading({
    message: '请求中',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const res = response.data
  console.log(res)
  if (res.status !== 200) {
    // Toast(res.data)
    Toast.clear()
    return Promise.reject(res.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default request

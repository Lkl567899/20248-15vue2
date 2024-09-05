import request from '@/utils/request'

// 获取首页数据
export const getPageDetailAPI = () => {
  return request.get('/page/detail')
}

import request from '@/utils/request'
// 获取分类数据
export const getCategoryListAPI = () => {
  return request.get('/category/list')
}

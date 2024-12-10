import request from '@/utils/request'
// 订单列表
export const getOrderListAPI = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

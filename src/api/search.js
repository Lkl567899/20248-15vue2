import request from '@/utils/request'
// 商品搜索
export const getGoodsListAPI = (goodsName, sortType, sortPrice) => {
  return request.get('/goods/list', {
    params: {
      goodsName,
      sortType,
      sortPrice
    }
  })
}

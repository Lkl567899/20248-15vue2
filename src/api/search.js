import request from '@/utils/request'
// 商品搜索
export const getGoodsListAPI = (goodsName, sortType, sortPrice, categoryId) => {
  return request.get('/goods/list', {
    params: {
      goodsName,
      sortType,
      sortPrice,
      categoryId
    }
  })
}
// 分类id搜索
export const getCategorysListAPI = (categoryId, sortType, sortPrice) => {
  return request.get('/goods/list', {
    params: {
      categoryId,
      sortType,
      sortPrice
    }
  })
}

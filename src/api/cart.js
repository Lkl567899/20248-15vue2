import request from '@/utils/request'
// 添加到购物车
export const PostCartItemAPI = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', { goodsId, goodsNum, goodsSkuId })
}
// 获取购物车商品数量
export const getCartTotalAPI = () => {
  return request.get('/cart/total')
}
// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 修改购物车单品数量
export const updateCartAPI = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', { goodsId, goodsNum, goodsSkuId })
}
// 删除
export const delCartItemAPI = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}

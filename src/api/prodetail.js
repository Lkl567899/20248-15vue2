import request from '@/utils/request'
// 获取商品详情
export const getProdetailItemAPI = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
// 获取评论
export const getCommentListAPI = (scoreType, goodsId, page) => {
  return request.get('/comment/list', {
    params: {
      scoreType,
      goodsId,
      page
    }
  })
}

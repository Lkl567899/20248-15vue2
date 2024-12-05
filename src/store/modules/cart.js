import { delCartItemAPI, getCartList, updateCartAPI } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    cartAPI (state, data) {
      state.cartList = data
    },
    // 修改购物车单品数量
    changItem (state, data) {
      const { value, id } = data
      const item = state.cartList.find(item => item.goods_id === id)
      item.goods_num = value
    },
    // 单选框
    setChecked (state, id) {
      const idItem = state.cartList.find(item => item.goods_id === id)
      idItem.checked = !idItem.checked
    },
    // 全选
    setAll (state, temp) {
      state.cartList.forEach(item => {
        item.checked = temp
      })
    }
  },
  actions: {
    // 获取购物车列表
    async getCartListData (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.checked = true
      })
      console.log(data.list)
      context.commit('cartAPI', data.list)
    },
    async changeCountAction (context, data) {
      const { value, id, skuId } = data
      console.log(value, id, skuId)
      context.commit('changItem', { value, id })
      await updateCartAPI(id, value, skuId)
    },
    // 删除
    async delSelect (context) {
      const delList = context.getters.cartItem
      const cartIds = delList.map(item => item.id)
      await delCartItemAPI(cartIds)
      Toast('删除成功')
      context.dispatch('getCartListData')
    }
  },
  getters: {
    // 商品总数
    totalNum (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的商品
    cartItem (state) {
      return state.cartList.filter(item => item.checked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.cartItem.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.cartItem.reduce((sum, item, index) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 全选
    allSelecked (state) {
      return state.cartList.every(item => item.checked)
    }
  }
}

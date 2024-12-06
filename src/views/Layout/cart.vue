<template>
  <div class="cart">
    <van-nav-bar title="购物车" class="flexdBar"></van-nav-bar>
<div v-if="totalNum">
  <div class="cartList">
      <div class="cart-title">
        <div class="fs12">共{{ totalNum }}件商品</div>
        <div class="fs12" @click="isEdit = !isEdit">{{isEdit? '完成' :'编辑'}}</div>
      </div>
      <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
        <van-checkbox :value="item.checked" class="checked" @click="setChecked(item.goods_id)"></van-checkbox>
        <div class="left" @click="$router.push(`/prodetail/${item.goods_id}`)">
          <img :src="item.goods.goods_image" alt="">
        </div>
        <div class="right">
          <div class="text-ellipsis-2 text">{{ item.goods.goods_name }}</div>
          <div class="botton">
            <div class="price">${{ item.goods.goods_price_min }}</div>
            <numInput :value="item.goods_num" @input="value => changeCount(value, item.goods_id, item.goods_sku_id)">
            </numInput>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-checkbox :value="allSelecked" class="checked fs12" @click="setAll">全选</van-checkbox>
      <div class="box">
        <div class="totalPrice fs12">合计: <span>￥{{ selPrice }}</span></div>
        <div v-if="!isEdit" class="btn fs12" @click="cartPay">去结算({{ selCount }})</div>
        <div v-else class="btn fs12" @click="delItem">删除</div>
      </div>
    </div>
</div>
   <div v-else>
    <van-empty description="您的购物车是空的~ 快去逛逛吧" />
    <div class="emptyBtn" @click="$router.push('/home')">去逛逛</div>
   </div>
  </div>
</template>

<script>
import numInput from '@/components/numInput.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'CartIndex',
  data () {
    return {
      checked: true,
      value: 1,
      isEdit: false
    }
  },
  components: {
    numInput
  },
  created () {
    this.getCart()
  },
  methods: {
    getCart () {
      const token = this.$store.getters.token
      if (token) {
        this.$store.dispatch('cart/getCartListData')
      }
    },
    // 修改单品数量
    changeCount (value, id, skuId) {
      this.$store.dispatch('cart/changeCountAction', { value, id, skuId })
    },
    // 单选框
    setChecked (id) {
      this.$store.commit('cart/setChecked', id)
    },
    // 全选框
    setAll () {
      this.$store.commit('cart/setAll', !this.allSelecked)
    },
    // 删除
    delItem () {
      if (this.selCount === 0) return false
      this.$store.dispatch('cart/delSelect')
    },
    // 购物车结算
    cartPay () {
      if (this.selCount <= 0) {
        return false
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartIds: this.cartItem.map(item => item.id).join(' ')
        }
      })
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['totalNum', 'selCount', 'cartItem', 'selPrice', 'allSelecked'])
  },
  watch: {
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/setAll', false)
      } else {
        this.$store.commit('cart/setAll', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  .emptyBtn {
margin:  10px auto;
text-align: center;
    border-radius: 17px;
    color: #fff;
    padding: 5px 0;
    width: 110px;
    background-color: red;
  }

  .flexdBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .cartList {
    padding: 0 12px;
    margin-bottom: 120px;
    margin-top: 45px;

    .cart-title {
      display: flex;
      padding: 16px 0;
      justify-content: space-between;
    }

    .cart-item {
      background-color: #fff;
      margin-bottom: 17px;
      border-radius: 8px;
      padding: 17px 6px;
      display: flex;

      .checked {
        align-items: center;
        padding: 0 3px;
      }

      .left {
        padding-right: 5px;

        img {
          width: 100px;
          height: 120px;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .text {
          font-size: 15px;
        }

        .botton {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .price {
            color: red;
            font-size: 18px;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 50px;
    left: 0;
    height: 55px;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .box {
      display: flex;
      align-items: center;

      .totalPrice {
        padding: 0 10px;

        span {
          font-size: 16px;
          color: red;
          font-size: 14px;
        }
      }

      .btn {
        padding: 10px 0;
        width: 80px;
        background-color: red;
        border-radius: 37px;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>

<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" left-arrow @click-left="$router.go(-1)" class="nav-bar"/>
    <div class="oh">
      <div class="address">
      <div class="left">
        <van-icon name="location-o"  class="location"/>
        <div class="text">
          <div class="one">{{address.name}} {{address.phone}}</div>
          <div class="two">{{region}} {{address.detail}}</div>
        </div>
      </div>
      <div class="right" @click="setAddress">
        <van-icon name="arrow" />
      </div>
     </div>
      <div class="item-box">
        <div class="item" v-for="item in goodsList" :key="item.goods_id">
          <div class="left">
          <img :src="item.goods_image" alt="">
        </div>
        <div class="right">
          <div class="text .text-ellipsis-2">{{item.goods_name}}</div>
          <div class="nunText">
            <div class="num">x{{item.total_num}}</div>
            <div class="price red">${{item.total_pay_price}}</div>
          </div>
        </div>
      </div>
      <div class="btm">
          <span style="color: #777;">共{{order.orderTotalNum}}件商品, 合计:</span><span class="red"> ${{order.orderPayPrice}}</span>
        </div>
      </div>
      <div class="total">
        <div class="total-item">
          <div class="text">订单总金额:</div>
          <div class="temp red">${{order.orderTotalPrice}}</div>
        </div>
        <div class="total-item">
          <div class="text">优惠券:</div>
          <div class="temp">无优惠券可用</div>
        </div>
        <div class="total-item">
          <div class="text">配送费用:</div>
          <div class="temp red">+￥0.00</div>
        </div>
      </div>
      <div class="paySelect">
        <div class="title">支付方式</div>
        <div class="weChatPay">
          <div class="text">
            <van-icon name="balance-o gold" />
            <span class="ye">余额支付 (可用${{money}}元)</span>
          </div>
          <div class="icon red">
            <van-icon name="success" />
          </div>
        </div>
      </div>
      <div class="message">
        <input type="text" @input="onInput" :disabled="this.isValue" class="none" v-model="message" placeholder="选填: 买家留言(五十字以内)">
        <div class="num">{{0 || messagenum}}/50</div>
      </div>
    </div>
    <div class="footer">
      <div class="text"><span>实付款:</span> <span class="red">${{order.orderTotalPrice}}</span></div>
      <div class="btn">提交订单</div>
      {{  }}
    </div>
  </div>
</template>

<script>
import { GetCheckoutOrderAPI } from '@/api/pay'
import { Toast } from 'vant'
export default {
  name: 'PayIndex',
  data () {
    return {
      address: {}, // 地址
      region: '', // 省市区
      message: '', // 买家留言
      messagenum: 0,
      money: 0, // 余额
      goodsList: [],
      order: {} // 杂项
    }
  },
  computed: {
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    isValue () {
      return this.messagenum === 50
    }
  },
  methods: {
    async GetCheckoutOrder () {
      // 购物车获取我的订单
      if (this.mode === 'cart') {
        console.log(this.cartIds)
        const res = await GetCheckoutOrderAPI(this.mode, { cartIds: this.cartIds })
        this.address = res.data.order.address
        this.money = res.data.personal.balance
        this.goodsList = res.data.order.goodsList
        this.order = res.data.order
        console.log(res.data)
        // 省市区
        this.region = Object.values(this.address.region).join(' ')
      }
    },
    setAddress () {
      this.$router.push('/addressList?temp=Pay')
    },
    // 监控字数
    onInput () {
      if (this.message.length > 50) {
        Toast('超出字数限制！')
        return false
      }
      this.messagenum = this.message.length
    }
  },
  created () {
    this.GetCheckoutOrder()
  }
}
</script>

<style lang="scss" scoped>
.pay{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f3f3;
  .nav-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
.oh {
  overflow: auto;
  height: 100%;
  padding: 46px 0 50px 0;
  .address {
    padding: 17px 15px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      font-size: 14px;
      display: flex;
      align-items: center;
      .location {
        padding-right: 8px;
      }
      .two {
        padding: 3px 0;
      }
    }
    .right {
      font-size: 14px;
    }
  }
.item-box {
  .item {
    display: flex;
    background-color: #fff;
    padding: 10px;

    .left {
        padding-right:10px;
        img {
        width: 100px;
        height: 100px;
      }
      }
      .right{
        display: flex;
        flex-direction: column;
        font-size: 14px;
        .nunText {
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
        }
      }

  }
  .btm {
      font-size: 14px;
      padding: 10px;
      text-align: right;
      background-color: #fff;
    }
}
  .total {
    font-size: 14px;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    background: #fff;
    .total-item {
      padding: 12px 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .paySelect {
    padding: 0 10px;
    font-size: 14px;
    background-color: #fff;
    .title {
      padding: 12px 0;
    }
    .weChatPay {
     display: flex;
     justify-content: space-between;
     align-items: center;
    padding: 8px 0;
    .text {
      .ye {
      padding-left: 5px;
    }
    }
    }
  }
  .message {
    margin: 10px 0;
    background-color: #fff;
    padding: 10px;
    font-size: 14px;
    color: #777;
    .none {
      border: none;
      outline: none;
      min-height: 40px;
      width: 100%;
    }
    .num {
      padding: 10px 0;
      text-align: right;
    }
  }
}
.footer {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  height: 50px;
  display: flex;
align-items: center;
justify-content: space-between;
  font-size: 14px;
.text {
  padding: 10px;
}
.btn {
  background: linear-gradient(90deg, #f9211c, #ff6335);
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  color: #fff;
  border-radius:0 0 10px 0;
}
}
}
</style>

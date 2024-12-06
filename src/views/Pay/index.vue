<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" left-arrow @click-left="$router.go(-1)" />
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
  </div>
</template>

<script>
import { GetCheckoutOrderAPI } from '@/api/pay'
export default {
  name: 'PayIndex',
  data () {
    return {
      address: {},
      region: ''
    }
  },
  computed: {
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    }
  },
  methods: {
    async GetCheckoutOrder () {
      if (this.mode === 'cart') {
        const res = await GetCheckoutOrderAPI(this.mode, { cartIds: this.cartIds })
        this.address = res.data.order.address
        console.log(this.address)
        // 省市区
        this.region = Object.values(this.address.region).join(' ')
      }
    },
    setAddress () {
      this.$router.push('/addressList?temp=Pay')
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
  .address {
    padding: 17px 15px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
}
</style>

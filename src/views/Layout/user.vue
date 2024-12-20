<template>
  <div class="user">
    <div class="head">
      <div class="box" v-if="this.token">
        <div class="tx">
          <img :src="user.avatar" alt="">
        </div>
        <div class="title">
          <div class="one">{{ user.mobile }}</div>
          <div class="two">{{ user.nick_name }}</div>
        </div>
      </div>
      <div class="box" v-else @click="$router.push('/login')">
        <div class="tx">
          <img src="" alt="">
        </div>
        <div class="title">
          <div class="one">未登录</div>
          <div class="two">点击登录</div>
        </div>
      </div>
    </div>
    <div class="yx">
      <div class="item">
        <div class="temp">{{ this.token ? user.balance : '- -' }}</div>
        <div>账户余额</div>
      </div>
      <div class="item">
        <div class="temp">{{ this.token ? 0 : '- -' }}</div>
        <div>积分</div>
      </div>
      <div class="item">
        <div class="temp">{{ this.token ? 0 : '- -' }}</div>
        <div>优惠券</div>
      </div>
      <div class="item">
        <van-icon name="paid" class="fs20" />
        <div>我的钱包</div>
      </div>
    </div>
    <div class="address">
      <div class="item" @click="address('/myorder?dataType=all')">
        <van-icon name="label-o" class="fs20" />
        <div class="temp">全部</div>
      </div>
      <div class="item" @click="address('/myorder?dataType=payment')" >
        <van-icon name="pending-payment" class="fs20" />
        <div class="temp">待支付</div>
      </div>
      <div class="item" @click="address('/myorder?dataType=delivery')">
        <van-icon name="logistics" class="fs20" />
        <div class="temp">待发货</div>
      </div>
      <div class="item" @click="address('/myorder?dataType=received')">
        <van-icon name="sign" class="fs20" />
        <div class="temp">待收货</div>
      </div>
    </div>
    <div class="fuwu">
      <div class="title">我的服务</div>
      <div class="box">
        <div class="item"  @click="address('/addressList')" >
          <van-icon name="location-o" class="icon" />
          <div class="text">收货地址</div>
        </div>
        <div class="item" @click="$router.push('/coupon')">
          <van-icon name="point-gift-o" class="icon"/>
          <div class="text">领券中心</div>
        </div>
        <div class="item">
          <van-icon name="vip-card-o" class="icon" />
          <div class="text">优惠券</div>
        </div>
        <div class="item">
          <van-icon name="todo-list-o" class="icon" />
          <div class="text">我的帮助</div>
        </div>
        <div class="item">
          <van-icon name="balance-list-o" class="icon" />
          <div class="text">我的积分</div>
        </div>
        <div class="item">
          <van-icon name="more-o" class="icon" />
          <div class="text">退换/售后</div>
        </div>
      </div>
    </div>
    <div class="btn" v-if="this.token" @click="submit">
      退出登录
    </div>
  </div>
</template>

<script>
import { GetUserInfoAPI } from '@/api/user'
import loginConfirmAPI from '@/mixins/loginConfirm'
export default {
  name: 'UserIndex',
  mixins: [loginConfirmAPI],
  data () {
    return {
      user: {}
    }
  },
  methods: {
    // 获取个人信息
    async GetUserInfo () {
      const res = await GetUserInfoAPI()
      this.user = res.data.userInfo
      console.log(this.user)
    },
    // 退出登录
    submit () {
      this.$store.dispatch('user/logOut')
      this.$store.commit('cart/cartAPI', [])
    },
    // 跳转到地址列表
    address (data) {
      if (this.loginConfirmAPI(data)) {
        return false
      }
      this.$router.push(data)
    }
  },
  created () {
    if (this.token) {
      this.GetUserInfo()
    }
  },
  computed: {
    token () {
      return this.$store.getters.token
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  height: 120vh;
  background-color: #f3f3f3;
  margin-bottom: 50px;

  .head {
    height: 180px;
    background: linear-gradient(70deg, #f093fb, #f5576c);
    width: 100%;
    display: flex;
    align-items: center;

    .box {
      display: flex;
      padding-left: 20px;

      .tx {
        img {
          width: 60px;
          height: 60px;
          border-radius: 25%;
        }
      }

      .title {
        padding-left: 20px;

        .one {
          font-size: 16px;
          font-weight: 700;
          padding-bottom: 10px;
        }

        .two {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }

  .yx {
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .item {
      padding: 10px 15px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .temp {
        margin-bottom: 5px;
        color: red;
      }

      .fs20 {
        font-size: 20px;
      }
    }
  }

  .address {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    margin: 15px 10px;

    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 15px;

      .fs20 {
        font-size: 20px;
      }

      .temp {
        padding-top: 10px;
      }
    }
  }

  .fuwu {
    background-color: #fff;
    margin: 0 10px;

    .title {
      padding: 10px;
    }

    .box {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 10px;

      .item {
        width: 25%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .text {
          padding-top: 10px;
        }

        .icon {
          color: red;
          font-size: 20px;
        }
      }
    }
  }

  .btn {
    text-align: center;
    margin: 40px auto;
    padding: 10px 80px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
}
</style>

<template>
  <div class="prodetail">
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.go(-1)" fixed />
    <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(item, index) in item.goods_images" :key="index"><img
          :src="item.external_url"></van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ length }}</div>
      </template>
    </van-swipe>
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥0.01</span>
          <span class="oldprice">￥6699.00</span>
        </div>
        <div class="sellcount">已售1001件</div>
      </div>
      <div class="msg text-ellipsis-2">
        三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫 5G手机 游戏拍照旗舰机s23
      </div>
    </div>
    <div class="service">
      <div class="left-words">
        <span><van-icon name="passed" />七天无理由退货</span>
        <span><van-icon name="passed" />48小时发货</span>
      </div>
      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="goods-comment">
      <div class="title">
        <div class="left">商品评价({{ total }}条)</div>
        <div class="right">查看更多<van-icon name="arrow" /></div>
      </div>
      <div class="list">
        <div class="list-item" v-for="(item, index) in totalList" :key="index">
          <div class="top">
            <img class="avatar" :src="item.user.avatar_url || defaultAvatar" alt="">
            <span>{{ item.user.nick_name }}</span>
            <van-rate :value="item.score / 2" :size="15" color="#ffd21e" void-icon="star" void-color="#eee" />
          </div>
          <div class="text text-ellipsis-2">{{ item.content }}</div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </div>
    <div class="tips">商品描述</div>
    <div class="desc" v-html="item.content"></div>
    <div class="footer">
      <div class="home" @click="$router.push('/home')">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="cart">
        <van-icon name="shopping-cart-o" />
        <span class="cartSpan" @click="$router.push('/cart')">购物车
          <div class="cart-temp" v-if="this.cartTotal > 0">{{cartTotal}}</div>
        </span>
      </div>
      <div class="add" @click="addCart('cart')">加入购物车</div>
      <div class="buy" @click="buy('buyNow')">立即购买</div>
    </div>
    <van-action-sheet v-model="show" :title="mode === 'cart' ? '加入购物车' : '立即购买'">
      <div class="content">
        <div class="title">
          <div class="left"><img :src="item.goods_image" alt=""></div>
          <div class="right">
            <div class="price"><span>$</span>{{ item.goods_price_min }}</div>
            <div class="total"><span>库存:</span>{{ item.stock_total }}</div>
          </div>
        </div>
        <div class="main">
          <div>数量</div>
          <numInput v-model="value"></numInput>
        </div>
        <div v-if="item.stock_total > 0">
          <div class="addBtn" v-if="mode === 'cart'" @click="Cart">加入购物车</div>
          <div class="addBtn now" v-if="mode === 'buyNow'">立刻购买</div>
        </div>
        <div class="addBtn none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { PostCartItemAPI, getCartTotalAPI } from '@/api/cart'
import { getCommentListAPI, getProdetailItemAPI } from '@/api/prodetail'
import defaultImg from '@/assets/阳菜.jpg'
import numInput from '@/components/numInput.vue'
export default {
  name: 'ProdetailIndex',
  created () {
    this.getProdetailItemData()
    this.getCommentListData()
    this.getCartTotalData()
  },
  components: {
    numInput
  },
  data () {
    return {
      item: {},
      current: 0,
      length: 0,
      total: 0,
      totalList: [],
      show: false,
      mode: '',
      value: 1,
      sku_id: 0,
      defaultAvatar: defaultImg,
      cartTotal: 0
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getProdetailItemData () {
      const res = await getProdetailItemAPI(this.id)
      this.item = res.data.detail
      this.sku_id = res.data.detail.skuList[0].goods_sku_id
      this.length = res.data.detail.goods_images.length
      console.log(res.data.detail)
    },
    async getCommentListData () {
      const res = await getCommentListAPI(-1, this.id, 1)
      this.total = res.data.list.total
      this.totalList = res.data.list.data
    },
    addCart (temp) {
      this.mode = temp
      this.show = true
    },
    buy (temp) {
      this.mode = temp
      this.show = true
    },
    // 获取购物车商品数量
    getCartTotalData () {
      getCartTotalAPI().then((res) => {
        this.cartTotal = res.data.cartTotal
      }).catch((err) => { console.log(err) })
    },
    // 加入购物车
    async Cart () {
      const token = this.$store.getters.token
      console.log(token)
      if (!token) {
        console.log('我没有')
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时此刻需要您先登录喔~',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => { })
      }
      const res = await PostCartItemAPI(this.id, this.value, this.sku_id)
      console.log(res)
      this.show = false
      // 获取购物车商品数量
      this.getCartTotalData()
    }
  }
}
</script>

<style lang="scss" scoped>
.prodetail {
  .content {
    padding: 16px;

    .title {
      display: flex;

      .left {
        img {
          width: 90px;
          height: 90px;
        }
      }

      .right {
        margin-left: 10px;

        .price {
          color: #fe560a;
          font-size: 24px;
          margin-bottom: 5px;
        }
      }
    }

    .main {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    }

    .addBtn {
      padding: 10px;
      text-align: center;
      color: white;
      font-size: 14px;
      border-radius: 18px;
      background-color: #ffa900;
      margin-top: 15px;
    }

    .none {
      color: rgb(255, 255, 255);
      background-color: rgb(178, 168, 153);
    }

    .now {
      background-color: #fe5630;
    }
  }

  margin-top: 44px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100% !important;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .desc {
    width: 100%;
    overflow: scroll;
    margin-bottom: 55px;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }

    img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 14px 17px;
    margin-top: 14px;

    .title {
      display: flex;
      justify-content: space-between;

      .sellcount {
        font-size: 13px;
        color: #959595;
        position: relative;
        top: 12px;
      }

      .now {
        color: #fa2209;
        font-size: 24px;
      }

      .oldprice {
        color: #959595;
        font-size: 14px;
      }
    }

    .msg {
      margin-top: 11px;
      font-size: 16px;
    }
  }

  .service {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 17px;
    text-align: center;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }
}

.goods-comment {
  margin-top: 10px;
  padding: 10px 17px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      font-size: 15px;
    }

    .right {
      color: #999;
      font-size: 12px;
    }
  }

  .list {
    .list-item {
      padding: 5px 0;

      .top {
        display: flex;
        align-items: center;

        span {
          margin: 0 5px;
        }

        img {
          width: 28px !important;
          height: 28px !important;
          border-radius: 50%;
        }

      }

      .text {
        font-size: 13px;
        margin: 5px 0;
      }

      .time {
        font-size: 13px;
        color: #999;
      }
    }
  }
}

.tips {
  padding: 14px 17px;
}

.footer {
  position: fixed;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 55px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .home,
  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    .van-icon {
      font-size: 24px;
    }
    .cartSpan {
      position: relative;
      .cart-temp{
        position: absolute;
        right: 0px;
        top: -28px;
        padding: 2px;
        color: white;
        font-size: 12px;
        border-radius: 28px;
        background-color: red;
      }
    }
  }

  .add,
  .buy {
    height: 36px;
    line-height: 36px;
    width: 120px;
    border-radius: 18px;
    background-color: #ffa900;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }

  .buy {
    background-color: #fe5630;
  }
}
</style>

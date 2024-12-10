<template>
  <div class="order">
    <van-nav-bar title="我的订单" class="bar" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="box">
      <van-tabs v-model="active">
        <van-tab name="all" title="全部"></van-tab>
        <van-tab name="payment" title="待支付"></van-tab>
        <van-tab name="delivery" title="待发货"></van-tab>
        <van-tab name="received" title="待收货"></van-tab>
        <van-tab name="comment" title="待评价"></van-tab>
      </van-tabs>
      <div v-if="list.length > 0" >
        <orderItem v-for="item in list" :item="item" :key="item.order_id"></orderItem>
      </div>
      <van-empty v-else description="暂无数据" />
    </div>
  </div>
</template>

<script>
import { getOrderListAPI } from '@/api/order'
import orderItem from '@/components/orderItem.vue'
export default {
  name: 'MyorderIndex',
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getOrderListAPI(this.active, this.page)
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
      console.log(this.list)
    }

  },
  components: {
    orderItem
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        console.log(this.active, '1111111')
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  height: 100vh;

  .bar {
    position: fixed;
    top: 0;
    z-index: 100;
    left: 0;
    width: 100%;
  }

  .box {
    overflow-y: auto;
    height: 100%;
    padding-top: 46px;
  }
}
</style>

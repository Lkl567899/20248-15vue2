<template>
  <div class="orderItem">
    <div class="timeTitle">
      <div class="time">{{ item.create_time }}</div>
      <div class="title red">{{ item.state_text }}</div>
    </div>
    <div class="item" v-for="(goods, index) in item.goods" :key="index">
      <div class="left"><img :src="goods.goods_image" alt=""></div>
      <div class="right">
        <div class="text text-ellipsis-2">{{ goods.goods_name }}</div>
        <div class="flag">
          <div class="price">¥{{ goods.total_pay_price }}</div>
          <div class="num">x{{ goods.total_num }}</div>
        </div>
      </div>
    </div>
    <div class="feature">
      <div class="card">
        <div class="temp">共 {{ item.total_num }}件商品, 总金额￥{{ item.total_price }}</div>
      </div>
      <div class="card-btn" v-if="item.order_status ===10">
        <span v-if="item.pay_status === 10">立刻付款</span>
        <span v-else-if="item.delivery_status === 10">申请取消</span>
        <span v-else-if="item.delivery_status === 20 || item.delivery_status === 30">确认收货</span>
      </div>
      <div v-if="item.order_status === 30">
        <span>评价</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.orderItem {
  background-color: #fff;
  border: 1px solid #fff;
  margin: 0 8px;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  .timeTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;

    .time {
      color: #ccc;
    }
  }

  .item {
    display: flex;

    .left {
      img {
        width: 100px;
        height: 110px;
      }
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      .text {
       padding: 0 8px;
       height: 38px;
      }
      .flag {
        color: #ccc;
      }
    }
  }

  .feature {
  display: flex;
  flex-direction: column;
     .card {
      display: flex;
      justify-content: flex-end;
      padding: 6px 0;
     }
     .card-btn {
      display: flex;
      justify-content: flex-end;
      span {
        padding: 5px;
        border-radius: 4px;
        border: 1px solid black;
      }
     }
  }
}
</style>

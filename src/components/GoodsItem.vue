<template>
  <div class="goodsItem" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div class="left">
      <img :src="item.goods_image" alt="">
    </div>
    <div class="right">
      <p class="text-ellipsis-2 tf">{{ item.goods_name }}</p>
      <p class="buy">已售{{ item.goods_sales }}件</p>
      <div class="price"><span class="red">¥{{ item.goods_price_min }}</span><span
          class="through">¥{{ item.goods_price_max }}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
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
.goodsItem {
  width: 100%;
  padding: 14px;
  margin-bottom: 8px;
  box-sizing: border-box;
  line-height: 1.6;
  display: flex;

  .left {
    img {
      width: 130px;
      height: 130px;
    }

    margin-right: 20px;
  }

  .right {
    .tf {
      font-size: 15px;
    }

    .buy {
      color: #999;
      font-size: 12px;
    }

    .price {
      .red {
        color: red;
        font-size: 15px;
      }

      .through {
        text-decoration: line-through;
        color: #999;
        font-size: 12px;
        margin-left: 2px;
      }
    }
  }
}
</style>

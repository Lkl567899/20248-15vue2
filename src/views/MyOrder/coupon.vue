<template>
  <div class="coupon">
    <van-nav-bar title="领券中心" class="bar" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-empty description="暂无信息" />
  </div>
</template>

<script>
export default {
  name: 'couponIndex',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f3f3;
}
</style>

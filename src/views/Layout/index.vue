<template>
  <div>
    <router-view />

<van-tabbar route>
  <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item replace to="/category" icon="fire-o">热门</van-tabbar-item>
  <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
  <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style lang="scss">
</style>

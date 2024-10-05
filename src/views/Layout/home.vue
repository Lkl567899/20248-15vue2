<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-search shape="round" background="#f7f7f7" placeholder="请输入搜索关键词" readonly @click="$router.push('/search')" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiper" :key="item.imgName"><img :src="item.imgUrl" alt=""></van-swipe-item>
    </van-swipe>
    <div class="test">
      <div class="testbox" v-for="item in pageList" :key="item.text">
        <img :src="item.imgUrl" alt="">
        <p>{{ item.text }}</p>
      </div>
    </div>
    <!-- 主会场 -->
    <div class="main">
      <img src="../../assets/阳菜.jpg" alt="" class="logo">
    </div>
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>
      <div class="guess-list">
        <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageDetailAPI } from '@/api/home'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      swiper: [],
      pageList: [],
      goodsList: []
    }
  },
  methods: {
    async getPageDetailData () {
      const res = await getPageDetailAPI()
      console.log(res.data.pageData.items)
      this.swiper = res.data.pageData.items[1].data
      this.pageList = res.data.pageData.items[3].data
      this.goodsList = res.data.pageData.items[6].data
    }
  },
  created () {
    this.getPageDetailData()
  }
}
</script>

<style lang="scss">
.home {
  padding-top: 48px;
  padding-bottom: 50px;
}

.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 185px;
    text-align: center;
    background-color: #39a9ed;
  }

  .van-swipe-item img {
    width: 100%;
    height: 185px;
  }
}

.test {
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  padding: 10px;

  .testbox {
    flex: 20%;
    display: flex;
    text-align: center;
    flex-direction: column;
    padding: 5px 0;

    img {
      margin: 0 auto;
      width: 50px;
      height: 50px;
    }

    p {
      margin-top: 5px;
    }
  }
}

.logo {
  width: 100%;
  height: 150px;
  display: block;
}

.guess {
  .guess-title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
  }
}
</style>

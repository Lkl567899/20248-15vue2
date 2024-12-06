<template>
  <div class="category">
  <van-nav-bar title="全部分类"></van-nav-bar>
  <van-search placeholder="搜索商品" @click="$router.push('/search')"></van-search>
  <div class="categoryList">
    <div class="left">
    <ul>
      <li v-for="(item, index) in categoryList" :key="item.category_id">
        <a href="javascript:;" @click="activeIndex = index" :class="{active: index === activeIndex}">{{item.name}}</a>
      </li>
    </ul>
    </div>
    <div class="right">
      <div class="cate-goods" v-for="item in categoryList[activeIndex]?.children" :key="item.category_id" @click="$router.push(`/searchlist?cateId=${item.category_id}`)">
        <img :src="item.image?.external_url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getCategoryListAPI } from '@/api/category'

export default {
  name: 'CategoryIndex',
  data () {
    return {
      categoryList: [],
      activeIndex: 0
    }
  },
  created () {
    this.getCategoryListData()
  },
  methods: {
    async getCategoryListData () {
      const res = await getCategoryListAPI()
      this.categoryList = res.data.list
      console.log(this.categoryList)
    }
  }
}
</script>

<style lang="scss" scoped>
.category{
  height: 100vh;
  .categoryList {
    display: flex;
    height: 100%;
    .left{
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
      a{
        display: block;
        height: 45px;
        line-height: 45px;
        color: #444444;
        font-size: 12px;
        text-align: center;
        &.active {
          color: #fb442f;
          background-color: #fff;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      padding: 10px 0;
      overflow: auto;
      .cate-goods {
        width: 33.33%;
        margin-bottom: 10px;
        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }
        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}

</style>

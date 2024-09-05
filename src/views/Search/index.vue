<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-search v-model="value" show-action placeholder="请输入搜索关键词" background="none">
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
    </van-search>
    <div class="saerchBox" v-if="search.length > 0">
      <div class="title">
        <div>最近搜索</div>
        <div @click="clearSearch"><van-icon name="delete-o" /></div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in search" :key="index" @click="$router.push(`/searchlist?id=${item}`)">
          {{
          item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchList, setSearchList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      value: '',
      search: getSearchList()
    }
  },
  methods: {
    // 搜索
    onSearch (v) {
      if (!/^\S*$/.test(v)) {
        return false
      }
      const key = this.search.indexOf(v)
      if (key !== -1) {
        this.search.splice(key, 1)
      }
      this.search.unshift(v)
      setSearchList(this.search)
      this.$router.push({
        path: '/searchlist',
        query: {
          id: v
        }
      })
    },
    // 删除搜索历史
    clearSearch () {
      console.log(123)
      this.search = []
      setSearchList(this.search)
    }
  }
}
</script>

<style lang="scss">
.search {
  height: 100vh;
  background-color: #f7f7f7;

  .van-search--show-action {
    padding: 14px;
  }

  .van-search__content {
    background-color: #fff;
  }

  .van-search__action {
    padding: 0 25px;
    border-radius: 0 7px 7px 0;
    background-color: #fa2209;
    color: #fff;
  }

  .saerchBox {
    padding: 10px 14px 0;

    .title {
      display: flex;
      justify-content: space-between;
      color: #777;
      font-size: 14px;
    }

    .list {
      padding: 5px;
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      .item {
        width: 30%;
        padding: 4px 2px;
        font-size: 12px;
        border-radius: 74px;
        margin: 5px;
        background-color: #fff;
        border: 1px #efefef solid;
      }
    }
  }
}
</style>

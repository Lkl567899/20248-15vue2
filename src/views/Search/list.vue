<template>
  <div class="SearchList">
    <van-nav-bar title="商品列表" left-arrow @click-left="$router.go(-1)" />
    <van-search readonly shape="round" background="#ffffff" :value="id ? id : '请输入需要搜索的商品'" show-action
      @click="$router.push('/search')">
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <div class="list-box">
      <div class="list-item" v-for="(item, index) in value" :key="index" @click="SearchItem(index)"
        :class="{ active: index === ChangeIndex }">{{ item }}</div>
    </div>
    <GoodsItem v-for="item in item" :key="item.goods_id" :item="item"></GoodsItem>
  </div>
</template>

<script>
import { getGoodsListAPI } from '@/api/search'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'ListIndex',
  data () {
    return {
      value: ['综合', '销量', '价格'],
      ChangeIndex: 0,
      item: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  components: {
    GoodsItem
  },
  methods: {
    async SearchItem (index) {
      this.ChangeIndex = index
      const res = await getGoodsListAPI(this.id)
      this.item = res.data.list.data
      if (this.ChangeIndex === 1) {
        const res = await getGoodsListAPI(this.id, 'sales')
        this.item = res.data.list.data
      } else if (this.ChangeIndex === 2) {
        const res = await getGoodsListAPI(this.id, 'price')
        this.item = res.data.list.data
      }
    }
  },
  created () {
    this.SearchItem(0)
  }
}
</script>

<style lang="scss">
.list-box {
  display: flex;

  .list-item {
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 8px;
    flex: 1;
    font-size: 16px;
  }
}

.active {
  color: #e49a3d;
}
</style>

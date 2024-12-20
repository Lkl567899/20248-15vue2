<template>
  <div class="review">
    <van-nav-bar title="商品评论页" class="bar" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="reviewList">
      <van-tabs v-model="act">
        <van-tab name="-1" title="全部"></van-tab>
        <van-tab name="10" title="好评"></van-tab>
        <van-tab name="20" title="中评"></van-tab>
        <van-tab name="30" title="差评"></van-tab>
      </van-tabs>
      <div class="list" v-if="box.length > 0">
        <review :item="item" v-for="(item, index) in box" :key="index"></review>
      </div>
      <van-empty v-else description="暂无数据" />
    </div>
  </div>
</template>

<script>
import review from '@/components/review.vue'
import { getCommentListAPI } from '@/api/prodetail'
export default {
  name: 'ProListIndex',
  data () {
    return {
      act: '',
      box: []
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  components: {
    review
  },
  methods: {
    // 获取评论
    async getCommentList () {
      const res = await getCommentListAPI(+this.act, this.id, 1)
      console.log(res.data.list.data)
      this.box = res.data.list.data
    }
  },
  watch: {
    act: {
      immediate: true,
      handler () {
        console.log(this.act)
        this.getCommentList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.review {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f3f3;
  .bar {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
  }
  .reviewList {
    padding-top: 46px;
    overflow-y: auto;
    .list {
      background-color: #fff;
      padding: 10px;
    }
  }
}
</style>

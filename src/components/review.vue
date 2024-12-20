<template>
  <div class="list-item">
    <div class="top">
      <img class="avatar" :src="item.user.avatar_url || defaultImg" alt="">
      <span>{{ item.user.nick_name }}</span>
      <van-rate :value="item.score / 2" :size="15" color="#ffd21e" void-icon="star" void-color="#eee" />
    </div>
    <div class="text text-ellipsis-2">{{ item.content }}</div>
    <div class="time">{{ item.create_time }}</div>
  </div>
</template>

<script>
import defaultImg from '@/assets/阳菜.jpg'
export default {
  name: 'reviewCts',
  data () {
    return {
      defaultImg
    }
  },
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
.list-item {
  padding: 10px 0;

  .top {
    display: flex;
    align-items: center;

    span {
      margin: 0 5px;
    }

    img {
      width: 28px !important;
      height: 28px !important;
      border-radius: 50%;
    }

  }

  .text {
    font-size: 13px;
    margin: 5px 0;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
}
</style>

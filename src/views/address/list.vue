<template>
  <div class="list">
    <van-nav-bar title="收货地址" class="addressTitle" left-arrow @click-left="$router.back(-1)"></van-nav-bar>
    <div class="addressList" v-if="list.length">
      <div class="item" v-for="item in list" :key="item.address_id">
        <div class="name">{{item.name}} {{item.phone}}</div>
        <div class="address">{{item.region.province}} {{item.region.city}} {{item.region.region}} {{item.detail}}</div>
        <div class="edit">
          <div class="btn">
            <van-radio-group v-model="defaultId" direction="horizontal">
              <van-radio :name="item.address_id" @click="PostDefaultId(item.address_id)">{{item.address_id === defaultId ? '默认' : '选择'}}</van-radio>
            </van-radio-group>
          </div>
          <div class="temp">
            <div class="on" @click="$router.push(`/addressItem?id=${item.address_id}`)">编辑</div>
            <div @click="delAddressItem(item.address_id)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn" @click="$router.push('/addressItem')">添加新地址</div>
    </div>
  </div>
</template>

<script>
import { delAddressItemAPI, getAddressListAPI, getDefaultIdAPI, PostDefaultIdAPI } from '@/api/address'
export default {
  name: 'addressList',
  data () {
    return {
      defaultId: 0,
      list: []
    }
  },
  computed: {
    temp () {
      return this.$route.query.temp
    }
  },
  methods: {
    // 获取地址列表
    async getAddressListData () {
      const res = await getAddressListAPI()
      this.list = res.data.list
      if (res) {
        const id = this.list.findIndex(item => item.address_id === this.defaultId)
        const item = this.list.find(item => item.address_id === this.defaultId)
        this.list.splice(id, 1)
        this.list.unshift(item)
      }
    },
    // 获取默认id
    async getDefaultId () {
      const res = await getDefaultIdAPI()
      this.defaultId = res.data.defaultId
    },
    // 设置默认地址
    async PostDefaultId (id) {
      console.log(id)
      if (this.temp) {
        await PostDefaultIdAPI(id)
        this.$router.go(-1)
      }
      await PostDefaultIdAPI(id)
      this.getAddressListData()
    },
    // 删除收货地址
    async delAddressItem (id) {
      await delAddressItemAPI(id)
      this.getAddressListData()
    }
  },
  created () {
    this.getDefaultId()
    this.getAddressListData()
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
  position: relative;

  .addressTitle {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .addressList {
    margin-top: 46px;
    padding: 10px 15px;
    overflow-y: auto;
    .item {
      font-size: 15px;
      padding: 10px 15px;
      background-color: #fff;
      border-radius: 8px;
      border: 2px solid #fff;
      margin-bottom: 15px;

      .address {
        padding: 5px 0 10px 0;
      }

      .edit {
        display: flex;
        justify-content: space-between;
        padding: 10px 0 5px 0;
        font-size: 14px;
        border-top: 1px solid #f5f5f5;

        .temp {
          display: flex;

          .on {
            padding-right: 5px;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60px;
    width: 100%;
    border: 2px solid #fff;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
      background-color: red;
      height: 40px;
      color: #fff;
      line-height: 40px;
      width: 80%;
      text-align: center;
      border-radius: 30px;
      font-size: 14px;
    }
  }
}
</style>

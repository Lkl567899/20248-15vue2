<template>
  <div class="item">
    <van-nav-bar title="收货地址"></van-nav-bar>
    <div class="box">
      <div class="title">收货地址</div>
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="姓名" label="姓名" placeholder="请输入收获人姓名"
          :rules="[{ required: true, message: '请输入姓名' }]" />
        <van-field v-model="phone" name="电话" label="电话" placeholder="请输入收获人手机号"
          :rules="[{ required: true, message: '请输入手机号' }]" />
        <van-field readonly clickable name="area" :value="str" label="地区选择" placeholder="点击选择省市区" @click="pop()"
          :rules="[{ required: true, message: '请选择省市区' }]" />
        <van-field v-model="allAddress" name="详细地址" label="详细地址" placeholder="街道门牌 楼层等信息"
          :rules="[{ required: true, message: '请输入详细地址' }]" />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">保存</van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel" ref="picker"
        @change="onChange" />
    </van-popup>
  </div>
</template>

<script>
import { addAddressItemAPI, getAddressProdetailAPI, GetRegionTreeAPI, PostAddressEditAPI } from '@/api/address'

export default {
  name: 'addressItem',
  data () {
    return {
      username: '',
      phone: '',
      allAddress: '',
      columns: [], // 对象数组，配置每一列显示的数据
      show: false,
      region: [],
      str: ''
    }
  },
  computed: {
    res () {
      return this.$refs.picker.getValues()
    },
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    // 获取地址详情
    async getAddressProdetail () {
      const res = await getAddressProdetailAPI(this.id)
      const data = res.data.detail
      this.username = data.name
      this.phone = data.phone
      this.allAddress = data.detail
      this.str = Object.values(data.region).join(' ')
      // 直接保存也有值
      this.region = [
        {
          label: data.region.province,
          value: data.province_id
        },
        {
          label: data.region.city,
          value: data.city_id
        },
        {
          label: data.region.region,
          value: data.region_id
        }
      ]
    },
    // 唤出地址选择器
    pop () {
      this.show = true
    },
    // 点击完成按钮时触发
    onConfirm (e) {
      this.show = false
      this.str = e.join(' ') // 地址
      this.temp() // 获取
    },
    // 点击取消按钮时触发
    onCancel () {
      this.show = false
      this.$refs.picker.setValues(this.strA)
    },
    // 选项改变时触发
    onChange () {
    },
    // 仅在提交表单时触发校验
    async onSubmit () {
      // 修改
      if (this.id) {
        await PostAddressEditAPI(this.id, this.username, this.phone, this.region, this.allAddress)
      } else {
      // 提交
        await addAddressItemAPI(this.username, this.phone, this.region, this.allAddress)
      }
      this.$router.replace('/addressList')
    },
    async GetRegionTree () {
      const res = await GetRegionTreeAPI()
      const box = Object.values(res.data.list)
      // 省
      const newBox = box.map(item => {
        return {
          text: item.name,
          value: item.id,
          children: Object.values(item.city)
        }
      })
      // 市
      newBox.forEach(item => {
        item.children = item.children.map(i => {
          return {
            text: i.name,
            value: i.id,
            children: Object.values(i.region)
          }
        })
      })
      // 区
      newBox.forEach(item => {
        item.children.forEach(i => {
          i.children = i.children.map(v => {
            return {
              text: v.name,
              value: v.id
            }
          })
        })
      })
      this.columns = newBox
    },
    // 点击确定时 准备好交给后台地址的值
    temp () {
      this.region = this.res.map(item => {
        return {
          label: item.text,
          value: item.value
        }
      })
    }
  },
  created () {
    this.GetRegionTree()
    if (this.id) {
      this.getAddressProdetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;

  .box {
    padding: 10px;

    .title {
      font-size: 14px;
      padding: 10px 0;
    }
  }
}
</style>

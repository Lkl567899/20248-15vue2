<template>
  <div class="Login">
    <van-nav-bar
  title="会员登录"
  left-arrow
  fixed
  :placeholder="true"
  @click-left="$router.go(-1)"
/>
<div class="item">
  <h3>手机号登录</h3>
  <p class="title">未注册的手机号登录后将自动注册</p>
  <div class="form">
    <div class="formitem">
      <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
    </div>
    <div class="formitem">
      <input class="inp" maxlength="11" placeholder="请输入图形验证码" type="text">
      <img :src="base64" alt="" @click="getCaptchaImageData()">
    </div>
    <div class="formitem">
      <input class="inp" maxlength="11" placeholder="请输入短信验证码" type="text">
      <button>获取验证码</button>
    </div>
  </div>
  <div class="login-btn">登录</div>
</div>
  </div>
</template>

<script>
import { getCaptchaImageAPI } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      base64: '',
      key: ''
    }
  },
  methods: {
    // 获取图形验证码
    async getCaptchaImageData () {
      const res = await getCaptchaImageAPI()
      this.base64 = res.data.base64
      this.key = res.data.key
    }
  },
  created () {
    // 获取图形验证码
    this.getCaptchaImageData()
  }
}
</script>

<style lang="scss">
.Login{
  display: flex;
  flex-direction: column;
  height: 100vh;
  .item{
    margin-top: 50px;
    padding: 0 50px;
    h3{
      font-size: 30px;
      font-weight: 400;
    }
    .title{
      color: #b8b8b8;
      line-height: 40px;
      font-size: 14px;
    }
    .formitem{
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      .inp{
        border: none;
        outline: none;
        height: 32px;
        font-size: 14px;
        flex: 1;
      }
      img {
      width: 94px;
      height: 31px;
      }
      button{
        height: 31px;
        border: none;
        color: #cea26a;
        background-color: transparent;
        padding-right: 9px;
      }
    }
    .login-btn{
      width: 100%;
      height: 42px;
      margin-top: 39px;
      background: linear-gradient(90deg,#ecb53c,#ff9211);
      color: #fff;
      border-radius: 39px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
      letter-spacing: 2px;
    }
  }
}
</style>

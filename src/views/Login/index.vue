<template>
  <div class="Login">
    <van-nav-bar title="会员登录" left-arrow fixed :placeholder="true" @click-left="$router.go(-1)" />
    <div class="item">
      <h3>手机号登录</h3>
      <p class="title">未注册的手机号登录后将自动注册</p>
      <div class="form">
        <div class="formitem">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="mobile">
        </div>
        <div class="formitem">
          <input class="inp" maxlength="11" placeholder="请输入图形验证码" type="text" v-model="captchaCode">
          <img :src="base64" alt="" @click="getCaptchaImageData()">
        </div>
        <div class="formitem">
          <input class="inp" maxlength="11" placeholder="请输入短信验证码" type="text" v-model="phoneCode">
          <button @click="getPhoneCode()">{{ seconds === ALLseconds ? '获取验证码' : seconds + '后发送' }}</button>

        </div>
      </div>
      <div class="login-btn" @click="onSubmit()">修复修复修复</div>
    </div>
  </div>
</template>

<script>
import { getCaptchaImageAPI, postCaptchaSendSmsCaptchaAPI, postPassportLoginAPI } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      base64: '',
      key: '',
      mobile: '', // 手机号
      captchaCode: '', // 用户输入的图形验证码
      phoneCode: '', // 用户输入的短信验证码
      timer: null,
      seconds: 60, // 秒
      ALLseconds: 60
    }
  },
  methods: {
    // 获取图形验证码
    async getCaptchaImageData () {
      const res = await getCaptchaImageAPI()
      this.base64 = res.data.base64
      this.key = res.data.key
    },
    // 获取短信验证码
    async getPhoneCode () {
      if (!this.onForm()) {
        return
      }
      if (!this.timer && this.ALLseconds === this.seconds) {
        const res = await postCaptchaSendSmsCaptchaAPI(this.captchaCode, this.key, this.mobile)
        console.log(res)
        // 开启倒计时
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.seconds = this.ALLseconds
          }
        }, 1000)
      }
    },
    // 登录
    async onSubmit () {
      if (!this.onForm()) {
        return
      }
      if (!/^\d+$/.test(this.phoneCode)) {
        this.$toast('请输入正确的短信验证码')
        return false
      }
      const res = await postPassportLoginAPI(this.mobile, this.phoneCode)
      console.log(res.data)
      this.$store.commit('user/setInfo', res.data)
      this.$toast('登录成功')
      this.$router.push('/')
    },
    // 校验
    onForm () {
      if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^[A-Za-z0-9]+$/.test(this.captchaCode)) {
        this.$toast('请输入正确图形验证码')
        return false
      }
      return true
    }
  },
  created () {
    // 获取图形验证
    this.getCaptchaImageData()
  }
}
</script>

<style lang="scss">
.Login {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .item {
    margin-top: 50px;
    padding: 0 50px;

    h3 {
      font-size: 30px;
      font-weight: 400;
    }

    .title {
      color: #b8b8b8;
      line-height: 40px;
      font-size: 14px;
    }

    .formitem {
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;

      .inp {
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

      button {
        height: 31px;
        font-size: 14px;
        border: none;
        color: #cea26a;
        background-color: transparent;
        padding-right: 9px;
      }
    }

    .login-btn {
      width: 100%;
      font-size: 14px;
      height: 42px;
      margin-top: 39px;
      background: linear-gradient(90deg, #ecb53c, #ff9211);
      color: #fff;
      border-radius: 39px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
      letter-spacing: 2px;
    }
  }
}
</style>

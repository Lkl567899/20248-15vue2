import request from '@/utils/request'
// 获取图形验证码
export const getCaptchaImageAPI = () => {
  return request.get('/captcha/image')
}
// 登录-获取短信验证码
export const postCaptchaSendSmsCaptchaAPI = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}
// 手机验证码登录
export const postPassportLoginAPI = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile,
      smsCode
    }
  })
}

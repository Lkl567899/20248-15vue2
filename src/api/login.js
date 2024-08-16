import request from '@/utils/request'
// 获取图形验证码
export const getCaptchaImageAPI = () => {
  return request.get('/captcha/image')
}

const hm_KEY = 'HM_KEY'
// 获取个人信息
export const getUserInfo = () => {
  const result = localStorage.getItem(hm_KEY)
  return result ? JSON.parse(result) : {token: '',userId: ''}
}
// 设置个人信息
export const setUserInfo = (info) => {
localStorage.setItem(hm_KEY, JSON.stringify(info))
}
// 移出个人信息
export const delUserInfo = () => {
  localStorage.removeItem(hm_KEY)
}

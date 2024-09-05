const HM_KEY = 'HM_KEY'
const S_KEY = 'S_KEY'
// 获取个人信息
export const getUserInfo = () => {
  const result = localStorage.getItem(HM_KEY)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}
// 设置个人信息
export const setUserInfo = (info) => {
  localStorage.setItem(HM_KEY, JSON.stringify(info))
}
// 移除个人信息
export const delUserInfo = () => {
  localStorage.removeItem(HM_KEY)
}
// 获取搜索信息
export const getSearchList = () => {
  const result = localStorage.getItem(S_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索信息
export const setSearchList = (arr) => {
  localStorage.setItem(S_KEY, JSON.stringify(arr))
}

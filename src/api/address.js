import request from '@/utils/request'
// 获取地址列表
export const getAddressListAPI = () => {
  return request.get('/address/list')
}
// 默认收货地址id
export const getDefaultIdAPI = () => {
  return request.get('/address/defaultId')
}
// 设置默认地址
export const PostDefaultIdAPI = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}
// 获取省市区
export const GetRegionTreeAPI = () => {
  return request.get('/region/tree')
}

// 新增收货地址
export const addAddressItemAPI = (name, phone, region, detail) => {
  return request.post('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
// 获取收货地址详情
export const getAddressProdetailAPI = (addressId) => {
  return request.get('/address/detail', {
    params: {
      addressId
    }
  })
}
// 编辑收货地址
export const PostAddressEditAPI = (addressId, name, phone, region, detail) => {
  return request.post('/address/edit', {
    addressId,
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}
// 删除收货地址
export const delAddressItemAPI = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}

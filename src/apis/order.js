
import request from '@/utils/http'
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return request({
    url:'/member/order/pre'
  })
}

//提交订单

export const createOrderAPI = (data)=>{

    return request({

        url:'/member/order',
        method:"POST",
        data
    })
}

/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/


export const getUserOrder = (params) => {
  return request({
    url:'/member/order',
    method:'GET',
    params
  })
}




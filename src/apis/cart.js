import request from '@/utils/http'

//添加商品到购物车
export const addCartAPI = ({skuId,count})=>{

    return request({

        url:"/member/cart",
        method:"POST",
        data:{

            skuId,
            count
        }
    })
}

export const getCartListAPI = ()=>{

    return request({

        url:"/member/cart"
    })
}
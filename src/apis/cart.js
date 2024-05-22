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
//获取购物车列表
export const getCartListAPI = ()=>{

    return request({

        url:"/member/cart"
    })
}

//购物车删除功能

export const delCartAPI = (ids) =>{

    return request({

        url:"/member/cart",
        method:"DELETE",
        data:{
            ids
        }
    })
}
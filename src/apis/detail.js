import request from '@/utils/http'

// export const getGoodsDetail = (id)=>{


//     return request({

//             url:"/goods",
//             params:{
//                 id
//             }
//         }
//     )
// }

export function getGoodsDetail(id){


    return request({

            url:"/goods",
            params:{
                id
            }
        }
    )
}

export function getHotGoodsAPI({id,type,limit = 3}){

    return request({

        url:"/goods/hot",
        params:{

            id,
            type,
            limit
        }
    })
}

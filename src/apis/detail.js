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
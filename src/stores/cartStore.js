
import {defineStore} from 'pinia'
import { computed, ref } from 'vue'
import {useUserStore} from "./userStore"
import { addCartAPI,getCartListAPI,delCartAPI} from "@/apis/cart"
 
export const useCartStore = defineStore('cart',()=>{

  //判断用户是否登录
  const userStore = useUserStore()
  const isLogin = computed(()=> userStore.userInfo.token)

  console.log(isLogin);
    const cartList = ref([])
  
    //添加商品到购物车
    const addCount = async (goods)=>{
  
      const {skuId,count} = goods
      if(isLogin.value){

        //保存到购物车
        await addCartAPI({skuId,count})

        //获取最新购物车列表
        upDateNewList()

      }else{

        const item = cartList.value.find((item)=> item.skuId === goods.skuId)
  
        if(item){
   
         item.count += goods.count
        }else{
   
         cartList.value.push(goods)
        }
      }
    }

    //刷新页面数据
    const upDateNewList = async ()=>{
      const res = await getCartListAPI()
      cartList.value = res.result

    }
  
    //从购物车中删除商品
    const delCart = async (skuId)=>{

      if(isLogin.value){

       await delCartAPI([skuId])
       //获取最新购物车列表
       upDateNewList()

      }else{

      //方法一
      // const idx = cartList.value.findIndex((item) => item.skuId === skuId)
      // cartList.value.splice(idx,1)

      //方法二
      cartList.value = cartList.value.filter(item => item.skuId !== skuId)
      }

    }


    //商品的数量
    // const allCount = computed(()=>{

    //   let count = 0
    //   for(let i = 0;i <cartList.value.length;i ++){

    //    count += cartList.value[i].count
    //   }
    //   return count;
    // })

    const allCount = computed(()=> cartList.value.reduce((a,c)=>a + c.count ,0))
    //商品的总价
    const allPrice = computed(()=> cartList.value.reduce((a,c)=>a + c.count*c.price,0))
    // const allPrice = computed(()=>{

    //   let price = 0
    //   for(let i = 0;i <cartList.value.length;i ++){

    //     price += cartList.value[i].count * cartList.value[i].price
    //   }
    //   return price;
    // })

    //已选商品的数量
    const selectedCount = computed(()=> cartList.value.filter(item => item.selected).reduce((a,c) => a + c.count,0))

    //已选商品的价格合计
    const selectedPrice = computed(()=> cartList.value.filter(item => item.selected).reduce((a,c) => a + c.count*c.price,0))

    //改变商品的选择状态
    const singleCheck = (skuId,selected)=>{

      const item = cartList.value.find((item)=> item.skuId === skuId)
      item.selected = selected
    }

    //是否全选
    const isAll = computed(()=> cartList.value.every((item)=> item.selected))


    //全选功能
    const allCheck = (selected)=>{

      cartList.value.forEach((item) => item.selected = selected)

    }
    //清除购物车
    const clearCart = ()=>{

      cartList.value = []
    }

    return {
  
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      addCount,
      clearCart,
      delCart,
      singleCheck,
      allCheck,
      upDateNewList
    }
},{

  persist:true
}
)
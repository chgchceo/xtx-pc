
//封装分类banner模块的业务逻辑


import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue';

export function UseBanner(){


//获取banner数据
const bannerList = ref([])

const getBanner = async () => {
  const res = await getBannerAPI(
    {
      distributionSite:"2"
    }
  )
  bannerList.value = res.result
}

onMounted(() => getBanner())

return {

    bannerList
}

}





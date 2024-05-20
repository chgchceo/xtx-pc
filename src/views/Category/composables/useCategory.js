
//封装分类模块的分类数据业务逻辑

import { getCategoryAPI } from '@/apis/category';
import { onMounted, ref } from 'vue';
import { useRoute,onBeforeRouteUpdate } from 'vue-router';


export function UseCategory(){


    const categoryData = ref({})

    const router = useRoute()
    const getCategory = async (id = router.params.id)=>{
    
       const res = await getCategoryAPI(id);
       categoryData.value = res.result;
    
    }
    onMounted(()=>{
    
        getCategory();
    })
    
    onBeforeRouteUpdate((to)=>{
    
      getCategory(to.params.id)
    })
    return {

        categoryData
    }
}



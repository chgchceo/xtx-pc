
<script setup>
import GoodsItem from "../Home/components/GoodsItem.vue";
import { getSubCategoryAPI,getSubCategoryGoodsAPI } from "@/apis/category.js"
import {ref,onMounted} from "vue"
import { useRoute } from "vue-router"


const categoryData = ref({})

const r = useRoute()
const getCategoryData = async ()=>{

   const res = await getSubCategoryAPI(r.params.id);

   categoryData.value = res.result;

}

onMounted(()=> getCategoryData())

//获取商品列表
const goodsList = ref([])

const data = ref({

  categoryId: r.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'

})

const getGoodsList = async ()=>{

  const res = await getSubCategoryGoodsAPI(data.value)

  goodsList.value = res.result.items;
}

onMounted(()=>{

  getGoodsList()
})

 function tabChange(){

  console.log("tab切换了",data.value.sortField);
  data.value.page = 1;
  getGoodsList()
 }

 const disabled = ref(false)
 //加载更多数据
  const load = async()=>{

data.value.page++
const res = await getSubCategoryGoodsAPI(data.value)

 goodsList.value = [...goodsList.value, ...res.result.items]

 //数据加载完成
 if(res.result.items.length === 0){

  disabled.value = true;
 }
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/category/'+categoryData.parentId }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="data.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->

         <GoodsItem :goods="goodsList"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0px;
  }


  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }


  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
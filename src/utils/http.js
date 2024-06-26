import axios  from "axios";
import {useUserStore} from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router  from "@/router";

const httpInstance = axios.create({

    baseURL:"http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout:50000
});

//拦截器
httpInstance.interceptors.request.use(config =>{

    //请求头中添加token
    const userStore = useUserStore()
    const token = userStore.userInfo.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},e=> Promise.reject(e))

httpInstance.interceptors.response.use(res => res.data ,e=>{

    //错误统一处理
    ElMessage({type:'warning',message:e.response?.data?.message})

    //401 token失效处理
    //清除用户信息，跳转到登录页面
    if(e?.response?.status === 401){
        const userStore = useUserStore()
        userStore.clearUserInfo()
        router.push('/login')
    }

    return Promise.reject(e)
})


export default httpInstance
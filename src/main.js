import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from './directives'
import App from './App.vue'
import router from './router'
import { createPersistedState } from 'pinia-persistedstate-plugin';  

import "@/styles/common.scss"

//引入全局插件
import { componentsPlugin } from '@/components/index'

const app = createApp(App)
const pinia = createPinia()
//数据持久化插件
const persist = createPersistedState()
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(componentsPlugin)
app.use(lazyPlugin)

app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "@/styles/common.scss"

//引入全局插件
import { componentsPlugin } from '@/components/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(componentsPlugin)

app.mount('#app')

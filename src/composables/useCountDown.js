
//封装倒计时逻辑运算函数
import dayjs  from "dayjs"
import {ref, computed, onUnmounted } from 'vue'

export const useCountDown = ()=>{

    const time = ref(0)
    let timer = null
    //对时间进行格式化 xx分xx秒
    const formatTime = computed(()=> dayjs.unix(time.value).format('mm分ss秒'))
    const start = (currentTime)=>{

        time.value = currentTime

        timer = setInterval(() => {
            
            time.value --

        }, 1000);
    }

    onUnmounted(()=> {

        timer && clearInterval(timer)
    })

    return {

        formatTime,
        start
    }
}


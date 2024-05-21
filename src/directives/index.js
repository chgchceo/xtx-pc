
import { useIntersectionObserver } from '@vueuse/core'

//定义懒加载插件
export const lazyPlugin = {

    install(app){

        //图片懒加载指令
        app.directive('img-lazy',{

            mounted(el,binding){
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {

                        console.log(isIntersecting);
                        if(isIntersecting){//滑动到了显示窗口

                            el.src = binding.value
                            stop()// 停止监听
                        }
                    },
                )
            }
        })
    }
}
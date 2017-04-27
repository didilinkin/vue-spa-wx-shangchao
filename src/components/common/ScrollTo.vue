// 公用组件 - 滚动到指定元素位置组件
<template lang="pug">
.scrollTo(
    v-show="ScrollToCanShowBoolean"
    v-bind:style="ScrollToPositionObj"
    v-scroll-to="ScrollToOptionsObj"
)
    img(
        v-bind:srcset="ScrollToImgObj.normal + ' 1x,' + ScrollToImgObj.retina + ' 2x'"
    )
</template>

<script>
/* global require: true */
export default {
    name: 'ScrollTo',
    props: {
        // 滚动按钮 - 配置
        ScrollToOptionsObj: {
            type: Object,
            default: function() {
                return {
                    el: '#app',                                                     // 滚动元素名称
                    duration: 2000,                                                 // 滚动时间
                    offset: 0,                                                      // 偏移量: 正值为向下偏移像素
                    // onDone: onDone,                                                  // 完成滚动后, 执行一个完成事件
                    easing: [.6, .80, .30, 1.9]                                     // 自定义宽松
                }
            }
        },
        // 滚动按钮 - 图片
        ScrollToImgObj: {
            type: Object,
            default: function() {
                return {
                    normal: require( '../../assets/images/btnBacktotop@2x.png' ),   // 默认分辨率
                    retina: require( '../../assets/images/btnBacktotop@3x.png' )    // 视网膜分辨率   
                }
            }
        },
        // 滚动按钮 - 位置定位
        ScrollToPositionObj: {
            type: Object,
            default: function() {
                return {
                    position: 'fixed',
                    right: '0.2rem',    
                    bottom: '2rem'
                }
            }
        },
        // 滚动按钮 - 显示状态( 传入的是 state中的某个状态 -> 如: 屏幕是否开始滚动状态 )
        ScrollToCanShowBoolean: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        // 目的: 当成功完成完成滚动后, 打印一个状态事件
        // 如果是状态记录, 可传入一个全局状态管理名称 -> 记录状态( 未添加 )
        onDone() {
            console.log( 'ScrollTo Done!' )
        }
    }
}
</script>

<style lang="sass" >
@import "../../sass/main"

.scrollTo
    >img
        +REM( width, $D-badgeWidth*.75 )
        +REM( height, $D-badgeWidth*.75 )
        object-fit: cover
</style>
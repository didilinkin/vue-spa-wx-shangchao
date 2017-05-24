// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global require:true */
import Vue          from 'vue'
import Mint         from 'mint-ui'
import layzr        from 'layzr.js'
import VueScrollTo  from 'vue-scrollto'
import StarRating   from 'vue-star-rating'
import 'mint-ui/lib/style.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import App          from './App'
import router       from './router'
import store        from './store'

// require( './assets/script/fort.js' )

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.debug = true

const lazyLoader = layzr({
    normal: 'data-normal',
    retina: 'data-retina',
    srcset: 'data-srcset',
    threshold: 35
})

Vue.use( Mint )
Vue.use( lazyLoader )
Vue.use( VueScrollTo )
Vue.use( StarRating )
Vue.use( require( 'vue-wechat-title' ) )

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

// 不同平台下的文字效果不同
if ( /(iPhone|iPad|iPod|iOS )/i.test( navigator.userAgent ) ) {
    document.body.style.fontFamily = 'PingFang SC Regular'
} else if ( /(Android)/i.test( navigator.userAgent ) ) {
    document.body.style.fontFamily = 'NoteSansCJKsc-Regular'
} else {
    document.body.style.fontFamily = 'Microsoft Yahei'
}

// explicitly set on window
window.toFaultDetail = function( module ) {
    // 重置class
    let arr = document.getElementsByClassName( 'Fault--title' )
    for( let i = 0; i < arr.length; i++ ) {
        arr[i].className = 'Fault--title'
    }

    // 选中元素, 添加选中类
    let elObj = document.querySelector( '#' + module + '--link' )
    elObj.setAttribute( 'class', 'Fault--title active' )

    // 详情 组件
    let faultModuleArr = document.querySelectorAll( '.Fault--module' )  // 重置掉两个 模块隐藏
    for( let i = 0; i < faultModuleArr.length; i++ ) {
        faultModuleArr[i].setAttribute( 'style', 'display: none' )
    }

    let elComponent = document.querySelector( '#' + module )            // 显示 选中的 模块
    elComponent.removeAttribute( 'style' )

    // 跳转URL
    location.href = '#/fault/' + module
}
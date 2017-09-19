// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global require:true */
import Vue          from 'vue'
import Mint         from 'mint-ui'
import layzr        from 'layzr.js'
import VueScrollTo  from 'vue-scrollto'
import 'mint-ui/lib/style.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import App          from './App'
import router       from './router'
import store        from './store'
require( './assets/iconFont/font-awesome.min.css' )

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
// 判斷是否微信登陸
function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase()
    console.log( ua )
    if ( ua.match( /MicroMessenger/i ) === 'micromessenger' ) {
        return true
    } else {
        return false
    }
}
if( isWeiXin() ) {
    console.log( '是来自微信内置浏览器' )
}else{
    location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx98c3af70778cd6ce&redirect_uri=https%3A%2F%2Fwx.myysq.com.cn%2Fauth%2Fopenid%3Ftenant_code%3Dpoly%26public_id%3D39d4e5fb-64ac-4d5c-3215-5b9941a7ac49%26return_url%3Dhttp%253A%252F%252Fvmember.myysq.com.cn%252Fpoly%252Fmember%252Fmembership%252Fmember-info%253Fpublic_id%253D39d4e5fb-64ac-4d5c-3215-5b9941a7ac49%26_state%3DFF5XJXwvSffQfL5i&response_type=code&scope=snsapi_base&state=Irc6pPM6BkTvIH0H&component_appid=wx05b2480ca122fbd0&connect_redirect=1#wechat_redirect'
}

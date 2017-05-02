// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* global require:true */

import Vue          from 'vue'
import 'mint-ui/lib/style.min.css'
import Mint         from 'mint-ui'
import layzr        from 'layzr.js'
import VueScrollTo  from 'vue-scrollto'
import StarRating   from 'vue-star-rating'

import App          from './App'
import router       from './router'
import store        from './store'

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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue          from 'vue'
import 'mint-ui/lib/style.min.css'
// import VueScrollTo  from 'vue-scrollto'
import StarRating   from 'vue-star-rating'

import App          from './App'
import router       from './router'
import store        from './store'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.debug = true

import { Button, InfiniteScroll } from 'mint-ui'
Vue.component( 
    Button.name, Button, InfiniteScroll
)
// Vue.use( VueScrollTo )
Vue.use( StarRating )

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
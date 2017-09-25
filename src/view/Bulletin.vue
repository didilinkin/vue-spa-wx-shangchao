// 物业公告
<template lang="pug">
#Bulletin
    BulletinLine( v-bind:bulletinLineArr="BulletinLineArr" )
    #vueLoading.vue-loading
        vue-loading(
            type="bars"
            color="#20a0ff"
        )
    ScrollTo(
        v-bind:ScrollToCanShowBoolean="this.$data.scrollStatus"
    )
</template>

<script>
import { mapGetters }   from 'vuex'
import vueLoading       from 'vue-loading-template'

import BulletinLine     from '../components/Bulletin/BulletinLine'
import ScrollTo         from '../components/common/ScrollTo'
const components = { BulletinLine, ScrollTo, vueLoading }

export default {
    name: 'Bulletin',
    methods: {
        // 目的: 发起请求 - 获取最新的公告信息
        requireBulletinInfo() {
            this.$store.dispatch({
//                type: 'o0CuEuD9L-YlwNO5nKEMUjK2zauY'
                type: 'bulletin/REQUEST_BULLETIN_INFO'
            })
        },
        // 目的: 监听滚轴
        watchScroll() {
            window.onscroll = () => {
                let yValue = window.scrollY                             // 滚轴状态
                if( typeof yValue === 'number' && yValue <= 100 ) {
                    this.$data.scrollStatus = false                     // 归零
                } else {
                    this.$data.scrollStatus = true                      // 改变
                }
            }
        }
    },
    data() {
        return {
            BulletinLineArr: [],
            scrollStatus: false                                         // 滚轴状态 => 是否显示'返回顶部'
        }
    },
    computed: mapGetters({
        getterBulletinInfo: 'getterBulletinInfo'
    }),
    watch: {
        // 当公告内容获取到, 触发
        getterBulletinInfo: function() {
            this.$data.BulletinLineArr = this.getterBulletinInfo
            let loading = document.getElementById( 'vueLoading' )
            console.log( '1111111111111111111111111' )
            loading.style.display = 'none'
            console.log( this.$data.BulletinLineArr )
            if( this.$data.BulletinLineArr.length === 0 ) {
                this.$router.push({path: '/Notext'})
            }
        }
    },
    mounted: function() {
        this.requireBulletinInfo()
        this.watchScroll()
    },
    components: components
}
</script>

// 物业公告
<template lang="pug">
#Bulletin
    BulletinLine( v-bind:bulletinLineArr="BulletinLineArr" )
    ScrollTo(
        v-bind:ScrollToCanShowBoolean="this.$data.scrollStatus"
    )
</template>

<script>
import { mapGetters }   from 'vuex'

import BulletinLine     from '../components/Bulletin/BulletinLine'
import ScrollTo         from '../components/common/ScrollTo'
const components = { BulletinLine, ScrollTo }

export default {
    name: 'Bulletin',
    methods: {
        // 目的: 发起请求 - 获取最新的公告信息
        requireBulletinInfo() {
            this.$store.dispatch({
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
        // 当 公告内容获取到, 触发
        getterBulletinInfo: function() {
            this.$data.BulletinLineArr = this.getterBulletinInfo
        }
    },
    mounted: function() {
        this.requireBulletinInfo()
        this.watchScroll()
    },
    components: components
}
</script>

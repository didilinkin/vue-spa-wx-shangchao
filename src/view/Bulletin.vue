// 物业公告
<template lang="pug">
#Bulletin
    h1 物业公告
    BulletinLine( v-bind:bulletinLineArr="BulletinLineArr" )
</template>

<script>
import { mapGetters } from 'vuex'

import BulletinLine     from '../components/Bulletin/BulletinLine'
const components = { BulletinLine }

export default {
    name: 'Bulletin',
    methods: {
        // 目的: 发起请求 - 获取最新的公告信息
        requireBulletinInfo() {
            this.$store.dispatch({
                type: 'bulletin/REQUEST_BULLETIN_INFO'
            })
        }
    },
    data() {
        return {
            BulletinLineArr: []
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
    },
    components: components
}
</script>
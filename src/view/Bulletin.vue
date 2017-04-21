// 物业公告
<template lang="pug">
#Bulletin
    h1 物业公告
    TimeLine( v-bind:renderListArr="BulletinTimeLineArr" )
</template>

<script>
import TimeLine         from '../components/common/TimeLine'
const components = { TimeLine }
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
            BulletinTimeLineArr: this.$store.state.bulletin.bulletinInfo.data
        }
    },
    mounted: function() {
        this.requireBulletinInfo()
    },
    components: components
}
</script>
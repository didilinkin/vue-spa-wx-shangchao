// 物业公告
<template lang="pug">
#Bulletin
    h1 物业公告
</template>

<script>
export default {
    name: 'Bulletin',
    methods: {
        // 目的: 发起请求 - 获取最新的公告信息
        requireBulletin() {
            this.$store.dispatch({
                type: 'bulletin/REQUEST_BULLETIN_INFO'
            })
        }
    },
    mounted: function() {
        this.requireBulletin()
    }
}
</script>
// 公用组件 - 滚动到指定元素位置组件
<template lang="pug">
    .weixin
        img.weixinPic( src="../../src/assets/images/weixin.jpg" )
        p.open 请用微信公众号打开
</template>

<script>
    export default {
        name: 'weixin'
    }
</script>

<style lang="sass" >
    @import "../sass/main"
    .weixinPic
        +REM-W-H( 90px )
        margin-left: 37%
        padding-top: 20px
    .weixin
        width: 100%
        height: 100%
        background-color: #fff
    .open
        +REM( font-size, 18px )
        text-align: center
        padding-top: 20px
</style>

// 公用组件 - 滚动到指定元素位置组件
<template lang="pug">
    .weixin
        img.weixinPic( src='../../src/assets/images/ico_bill.png' )
        p.open 抱歉，当前没有数据！
</template>

<script>
    export default {
        name: 'Notext'
    }
</script>

<style lang="sass" >
    @import "../sass/main"
    .weixinPic
        +REM-W-H( 90px )
        margin-left: 37%
        padding-top: 50%
    .weixin
        width: 100%
        height: 100%
        background-color: #F7F7FA
    .open
        +REM( font-size, 18px )
        text-align: center
        padding-top: 20px
</style>

// 通用组件 - 底部标题
<template lang="pug">
#BottomTitle
    .BottomTitle--content.auto--modulePaddingTB
        img( v-bind:src="BottomTitleImg" )
        h2 长江中心物业管家系统
</template>

<script>
/* global require: ture */ 
export default {
    name: 'BottomTitle',
    data() {
        return {
            BottomTitleImg: require( '../../assets/favicon.png' )
        }
    }
}    
</script>

<style lang="sass">
@import "../../sass/main"

#BottomTitle
    +FIXED
    bottom: 0
    +flexCenter
    +W100
    +bC( $C-base )
    .BottomTitle--content
        h2
            +REM-fontStyle( $F-badge, $C-copy )
            +dib
        >img
            +REM-padding-LR( $F-badge )
            +REM-W-H( $F-badge*1.5 )
            +imgAlignBottom
</style>
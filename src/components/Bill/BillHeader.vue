// '费用账单' - 账单头部 - 通用组件
<template lang="pug">
.BillHeader
    img(
        v-bind:srcset="`${bCImg.normal} 1x, ${bCImg.retina} 2x`"
    )
    .BillHeader__content
        p.BillHeader--title {{ contentObj.title }}
        h1 {{ contentObj.money }}
        p.BillHeader--companyName {{ contentObj.companyName }}
</template>

<script>
/* global require: true */
export default {
    name: 'BillHeader',
    props: {
        contentObj: {
            type: Object,
            default: function() {
                return {
                    title: '账单头部',
                    money: '0.00'
                }
            }
        }
    },
    data() {
        return {
            bCImg: {
                normal: require( '../../assets/images/bgWave@2x.png' ), // 默认分辨率
                retina: require( '../../assets/images/bgWave@3x.png' )  // 视网膜分辨率
            }
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

.BillHeader
    +REL
    +flexCenter
    +REM( height, $D-autoHeaderHeight )
    +bC-gradient( #101013, #2C2D31 )
    +opacity( .9 )
    >img
        +ABS
        bottom: 0
        +imgCover( 100% )
    .BillHeader__content
        +REL
        +W100
        +REM( padding-top, $D-autoMargin )
        +textCenter
        >h1
            +REM-fontStyle( $F-big-title, $C-W, 2 )
        >p.BillHeader--companyName
            +REM-fontStyle( $F-badge, $C-copy )
            +ell-line-one( 80% )
        >p.BillHeader--title
            +REM-fontStyle( $F-title, $C-copy, 1 )
            +fW( bold )
</style>

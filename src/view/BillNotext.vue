// '费用账单' - 账单头部 - 通用组件
<template lang="pug">
    .Billnotext
        img(
            v-bind:srcset="`${bCImg.normal} 1x, ${bCImg.retina} 2x`"
        )
        .BillHeader__content
            p.BillHeader--titled {{ contentObj.title }}
            .weixindd
                img.weixinPicd(
                    src='../assets/images/ico_bill.png'
                 )
                p.opend 暂时没有费用账单！
    </template>

<script>
    /* global require: true */
    export default {
        name: 'Billnotext',
        props: {
            contentObj: {
                type: Object,
                default: function() {
                    return {
                        title: '未交金额合计',
                        money: ''
                    }
                }
            }
        },
        data() {
            return {
                bCImg: {
                    normal: require( '../assets/images/bg03@2x.png' ), // 默认分辨率
                    retina: require( '../assets/images/bg03@3x.png' )  // 视网膜分辨率
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "../sass/main"

    .Billnotext
        +REL
        +flexCenter
        +REM( height, $D-autoHeaderHeight )
        +bC-gradient( #101013, #2C2D31 )
        height: 120px !important
        +opacity( .9 )
        >img
            +ABS
            bottom: 0
            +imgCover( 100% )
            height: 100%
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
            >p.BillHeader--titled
                +REM-fontStyle( $F-title, $C-W, 1 )
                +fW( bold )
                +REM( margin-top, 20px )
                margin-top: 55%
    .weixindd
        position: relative
        top: 150px

    .weixinPicd
        +REM-W-H( 90px )
    .opend
        +REM( font-size, 18px )
        text-align: center
        padding-top: 20px
</style>

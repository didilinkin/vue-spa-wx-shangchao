// '费用账单' - 账单费用组件 - 应用组件( 房屋租赁费 / 物业管理费 /  电费 / 水费 )
<template lang="pug">
ul.CostList
    li.auto--moduleMarginBottom(
        v-for="( item, index ) in briefListObj.listArr"
        v-bind:key="index"
        v-bind:style="{ backgroundColor: '#FFF' }"
    )
        .CostList__iconBox( v-bind:style="{ backgroundColor: briefListObj.listIconColor }" )
            img( v-bind:src="briefListObj.listIcon" )
        .CostList__contentBox
            .CostList__contentBox__title
                h2 {{ item.title }}
                h2
                    b {{ item.money }}
                img.CostList--arrowIcon( v-bind:src="costListArrowIcon" )
            .CostList__contentBox__date
                .CostList--text
                    span 收费周期
                    span {{ item.tollStartDate }}
                    span 至
                    span {{ item.tollDeadline }}
                .CostList--text
                    span 交费期限
                    span {{ item.payDate }}
</template>

<script>
/* global require: true */ 
export default {
    name: 'CostList',
    props: {
        // 简要列表( 收起样式 )
        briefListObj: {
            type: Object,
            default: function() {
                return {
                    listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                    listIconColor: 'rgb( 255, 181, 0 )',
                    listArr: [
                        {
                            title: '账单费用',
                            money: '1111',
                            tollStartDate: '2017-01-01',
                            tollDeadline: '2017-03-31',
                            payDate: '2017-04-10'
                        }
                    ]
                }
            }
        }
    },
    data() {
        return {
            costListArrowIcon: require( '../../assets/images/iconListArrow@2x.png' )    // 箭头
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

.CostList
    +REL
    .CostList__iconBox
        +ABS
        +REM-margin-TB( $D-autoMargin )
        +REM-margin-LR( $D-autoMargin/2 )
        +REM-W-H( $F-big-title*1.5 )
        +radius( 50% )
        >img
            padding: 20%
            +imgCover( 60% )
    .CostList__contentBox
        +REM( margin-left, ( $D-autoMargin + $F-big-title*1.5 ) )
        +REM( padding, $D-autoPadding )
// 标题 + 金额
.CostList__contentBox__title
    +REL
    +REM( padding-bottom, $D-autoPadding/2 )
    +borderBottom( $C-line )
    h2
        +dib
        +REM-fontStyle( $F-big-title/2, $C-title )
        &:first-child
            width: 50%
    >img
        margin-left: 5%
        +REM-W-H( $F-text )
        +imgAlign( middle )
        transform: rotate( 90deg )
// 日期内容
.CostList__contentBox__date
    +REM( padding-top, $D-autoPadding/2 )
    span 
        +REM( margin-right, $F-assist/2 )
        +REM-fontStyle( $F-assist, $C-copy )
</style>
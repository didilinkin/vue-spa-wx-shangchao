// '费用账单' - 账单押金组件 - 应用页面( 租赁保证金 / 能源管理押金 /  装修保证金 )
<template lang="pug">
ul.DepositList
    li.auto--modulePaddingTB(
        v-for="item in depositListArr"
        v-bind:key="item.classType"
    )
        // 圆形标题图标
        .DepositList__icon.auto--moduleIconBox(
            v-bind:class="'DepositList--' + item.classType"
        )
            h2 {{ item.title }}
        // 文本内容
        .DepositList__contentBox
            .DepositList__contentItem
                h2.DepositList--date {{ item.date }}
                h2.DepositList--money {{ item.money }}
            p.DepositList--description {{ item.description }}
</template>

<script>
export default {
    name: 'DepositList',
    props: {
        // 押金列表 - 内容
        depositListArr: {
            type: Array,
            default: function() {
                return [
                    {
                        classType: 'charge',
                        title: '扣',
                        date: '2017-04-10',
                        money: '-1024.02',
                        description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                        此处是说明`
                    }
                ]
            }
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

.DepositList 
    +bC( $C-W )
    >li
        +REL
        +borderBottom( $C-line )
        // 图标部分
        >.DepositList__icon
            +ABS
            +flexCenter
            >h2
                +REM-fontStyle( $F-title, $C-W )
        // 内容
        >.DepositList__contentBox
            +REM( margin-left, ( $D-autoMargin*2 + $F-big-title*1.5 ) )
            +REM-padding-LR( $D-autoMargin )
            padding-left: 0
            // 标题内容( 日期 + 金额 )
            .DepositList__contentItem
                +flexCenter
                >h2
                    flex: 1
                    +REM-fontStyle( $F-title, $C-title, 2 )
                >h2.DepositList--date
                    text-align: left
                >h2.DepositList--money
                    text-align: right  
            // 说明文字
            p.DepositList--description
                +REM-fontStyle( $F-badge, $C-assist, 2 )
                +ell-line( $F-badge*2, 2 )
        &:last-of-type
            border: none
            
// 圆圈配色 - 根据class名称
.DepositList--charge
    +bC( $C-bill-charge )
.DepositList--refunds
    +bC( $C-bill-refunds )
.DepositList--pay
    +bC( $C-bill-pay )
</style>
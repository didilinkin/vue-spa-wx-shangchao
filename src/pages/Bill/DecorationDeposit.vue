// '费用账单' - 装修保证金
<template lang="pug">
#DecorationDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )

    // 装修信息
    ul.DecorationInfo.auto--modulePadding.auto--moduleMarginBottom
        li
            span {{ DecorationInfo.startDate }}
            span 至
            span {{ DecorationInfo.deadLine }}
            h2 装修周期
        li.DecorationInfo--priceBox.auto--modulePaddingTB
            .DecorationInfo--priceItem
                span.moneyStyle {{ DecorationInfo.unitPrice }}元 / ㎡
                h2 装修保证金单价
            .DecorationInfo--priceItem.auto--modulePaddingLR
                span.moneyStyle ￥{{ DecorationInfo.deposit }}
                h2 装修保证金金额
    
    // 账单押金组件
    DepositList( v-bind:depositListArr="DepositList")
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
import DepositList      from '../../components/Bill/DepositList'
const components = { BillHeader, DepositList }

export default {
    name: 'DecorationDeposit',
    methods: {
        // 目的: 请求 - 装修保证金
        requireDecorationDeposit() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_DECORATION_DEPOSIT'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '装修保证金',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            },
            // 装修信息
            DecorationInfo: {
                startDate: '2017-01-15',    // 起始日
                deadLine: '2017-05-20',     // 截止日
                unitPrice: 20,              // 单价
                deposit: 123456.11          // 保证金
            },
            // 账单 押金数据 => '账单押金组件'组件
            DepositList: [
                {
                    classType: 'charge',
                    title: '扣',
                    date: '2017-04-10',
                    money: '-1024.02',
                    description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                    此处是说明`
                }, {
                    classType: 'refunds',
                    title: '退',
                    date: '2017-04-10',
                    money: '+1024.02',
                    description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                    此处是说明`
                }, {
                    classType: 'pay',
                    title: '支',
                    date: '2017-04-10',
                    money: '-1024.02',
                    description: `此处是说明此处是说明此处是说明此处是说明此处是说明
                                    此处是说明`
                }
            ]
        }
    },
    mounted: function() {
        this.requireDecorationDeposit()       // 请求 - 装修保证金
    },
    components: components
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

// 装修信息( 独有模块 ) 
ul.DecorationInfo
    +bC( $C-W )
    >li
        // 数值 使用标题样式
        span 
            +REM-fontStyle( $F-title, $C-title, 2 )
            +fW( normal )
            +REM( margin-right, $D-autoMargin )
        span.moneyStyle
            color: $C-money
        // 数值的标题 使用普通文本样式
        h2  
            +REM-fontStyle( $F-badge, $C-assist )
            +lS( $F-badge/2 )

// '金钱'容器 - 平分
.DecorationInfo--priceBox
    display: flex
    .DecorationInfo--priceItem
        flex: 1
        &:first-of-type
            border-right: 1px solid $C-line
</style>
// '费用账单' - 装修保证金
<template lang="pug">
#DecorationDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )

    // 装修信息
    ul.DecorationInfo.auto--modulePadding
        li
            span {{ DecorationInfo.startDate }}
            span 至
            span {{ DecorationInfo.deadLine }}
            h2 装修周期
        li 
            .DecorationInfo--priceBox
                span.moneyStyle {{ DecorationInfo.unitPrice }}元 / ㎡
                h2 装修保证金单价
            .DecorationInfo--priceBox
                span.moneyStyle ￥{{ DecorationInfo.deposit }}
                h2 装修保证金金额
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

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
            }
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

// 装修信息 
.DecorationInfo
    +bC( $C-base )
</style>
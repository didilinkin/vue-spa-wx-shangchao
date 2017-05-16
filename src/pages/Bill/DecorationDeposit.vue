// '费用账单' - 装修保证金
<template lang="pug">
#DecorationDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
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
            }
        }
    },
    mounted: function() {
        this.requireDecorationDeposit()       // 请求 - 装修保证金
    },
    components: components
}
</script>
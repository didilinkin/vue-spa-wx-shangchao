// '费用账单' - 租赁保证金
<template lang="pug">
#LeaseDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

export default {
    name: 'LeaseDeposit',
    methods: {
        // 目的: 请求 - 租赁保证金
        requireLeaseDeposit() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_BUILDING_FEE'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '租赁保证金',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
        }
    },
    mounted: function() {
        this.requireLeaseDeposit()       // 请求 - 租赁保证金
    },
    components: components
}
</script>
// '费用账单' - 电费
<template lang="pug">
#ElectricityBill
    BillHeader( v-bind:contentObj="BillHeaderObj" )
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

export default {
    name: 'ElectricityBill',
    methods: {
        // 目的: 请求 - 电费
        requireElectricityBill() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_ELECTRICITY_BILL'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '电费',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
        }
    },
    mounted: function() {
        this.requireElectricityBill()       // 请求 - 电费
    },
    components: components
}
</script>
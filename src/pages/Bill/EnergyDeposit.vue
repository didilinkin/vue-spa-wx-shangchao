g// '费用账单' - 能源管理押金
<template lang="pug">
#EnergyDeposit.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

export default {
    name: 'EnergyDeposit',
    methods: {
        // 目的: 请求 - 能源管理押金
        requireEnergyDeposit() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_ENERGY_DEPOSIT'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '能源管理押金',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
        }
    },
    mounted: function() {
        this.requireEnergyDeposit()       // 请求 - 能源管理押金
    },
    components: components
}
</script>
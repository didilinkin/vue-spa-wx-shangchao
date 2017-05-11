// '费用账单' - 水费
<template lang="pug">
#WaterFee
    BillHeader( v-bind:contentObj="BillHeaderObj" )
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

export default {
    name: 'WaterFee',
    methods: {
        // 目的: 请求 - 水费
        requireWaterFee() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_WATER_FEE'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '水费',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
        }
    },
    mounted: function() {
        this.requireWaterFee()       // 请求 - 水费
    },
    components: components
}
</script>
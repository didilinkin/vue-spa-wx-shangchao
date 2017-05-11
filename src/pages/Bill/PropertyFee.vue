// '费用账单' - 物业管理费
<template lang="pug">
#PropertyFee
    BillHeader( v-bind:contentObj="BillHeaderObj" )
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

export default {
    name: 'PropertyFee',
    methods: {
        // 目的: 请求 - 物业管理费
        requirePropertyFee() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_PROPERTY_FEE'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '物业管理费',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
        }
    },
    mounted: function() {
        this.requirePropertyFee()       // 请求 - 物业管理费
    },
    components: components
}
</script>
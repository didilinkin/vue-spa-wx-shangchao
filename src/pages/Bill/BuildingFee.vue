// '费用账单' - 房屋租赁费
<template lang="pug">
#BuildingFee
    BillHeader( v-bind:contentObj="BillHeaderObj" )
</template> 

<script>
import BillHeader       from '../../components/Bill/BillHeader'
const components = { BillHeader }

export default {
    name: 'BuildingFee',
    methods: {
        // 目的: 请求 - 账单详情
        requireBuildingFee() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_BUILDING_FEE'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '房屋租赁费',
                money: '123,456.00',
                companyName: this.$store.state.globalState.userInfo.companyName
            }
        }
    },
    mounted: function() {
        this.requireBuildingFee()       // 请求 - 账单详情
    },
    components: components
}
</script>
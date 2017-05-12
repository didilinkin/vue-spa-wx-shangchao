// '费用账单' - 房屋租赁费
<template lang="pug">
#BuildingFee
    BillHeader( v-bind:contentObj="BillHeaderObj" )
    CostList(
        v-bind:briefListObj="CostListBrief"
    )
</template> 

<script>
/* global require: true */ 
import BillHeader       from '../../components/Bill/BillHeader'
import CostList         from '../../components/Bill/CostList'
const components = { BillHeader, CostList }

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
            },
            // 费用列表 - 简要( 收起样式 展示 )
            CostListBrief: {
                listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                listIconColor: 'rgb( 255, 181, 0 )',
                // 列表数组
                listArr: [
                    {
                        title: '房屋租赁费A',
                        money: '1111,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '房屋租赁费B',
                        money: '2222,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '房屋租赁费C',
                        money: '3333,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }
                ]
            }
        }
    },
    mounted: function() {
        this.requireBuildingFee()       // 请求 - 账单详情
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"

#BuildingFee
    +bC( $C-base )
</style>
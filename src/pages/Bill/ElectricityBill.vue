// '费用账单' - 电费
<template lang="pug">
#ElectricityBill
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
            },
            // 费用列表 - 简要( 收起样式 展示 )
            CostListBrief: {
                listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                listIconColor: 'rgb( 255, 181, 0 )',
                // 列表数组
                listArr: [
                    {
                        title: '电费A',
                        money: '1111,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '电费B',
                        money: '2222,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '电费C',
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
        this.requireElectricityBill()       // 请求 - 电费
    },
    components: components
}
</script>
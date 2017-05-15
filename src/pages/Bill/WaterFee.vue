// '费用账单' - 水费
<template lang="pug">
#WaterFee
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
            },
            // 费用列表 - 简要( 收起样式 展示 )
            CostListBrief: {
                listIcon: require( '../../assets/images/iconWaterTitle@2x.png' ),
                listIconColor: 'rgb( 47, 163, 255 )',
                // 列表数组
                listArr: [
                    {
                        title: '水费A',
                        money: '1111,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '水费B',
                        money: '2222,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '水费C',
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
        this.requireWaterFee()       // 请求 - 水费
    },
    components: components
}
</script>
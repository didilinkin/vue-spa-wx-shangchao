// '费用账单' - 物业管理费
<template lang="pug">
#PropertyFee
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
            },
            // 费用列表 - 简要( 收起样式 展示 )
            CostListBrief: {
                listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                listIconColor: 'rgb( 255, 181, 0 )',
                // 列表数组
                listArr: [
                    {
                        title: '物业管理费A',
                        money: '1111,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '物业管理费B',
                        money: '2222,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10'
                    }, {
                        title: '物业管理费C',
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
        this.requirePropertyFee()       // 请求 - 物业管理费
    },
    components: components
}
</script>
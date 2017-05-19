// '费用账单' - 房屋租赁费
<template lang="pug">
#BuildingFee.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
    // v-on:watchDetailInfo="setDetailIndex"
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
                showNullBill: false,                            // 是否显示 '空账单'
                listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                listIconColor: 'rgb( 255, 181, 0 )',
                hasDetailList: false,                           // 是否显示 '详情列表': 否
                // 列表数组
                listArr: [
                    {
                        title: '房屋租赁费A',
                        money: '1111,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10',
                        showDetailInfo: false,
                        detailsInfo: [
                            {
                                title: '单价',
                                value: 5
                            }, {
                                title: '面积',
                                value: 400
                            }, {
                                title: '本期费用合计',
                                value: 12345.12
                            }
                        ]
                    }, {
                        title: '房屋租赁费B',
                        money: '2222,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10',
                        showDetailInfo: false,
                        detailsInfo: [
                            {
                                title: '单价',
                                value: 5
                            }, {
                                title: '面积',
                                value: 400
                            }, {
                                title: '本期费用合计',
                                value: 12345.12
                            }
                        ]
                    }, {
                        title: '房屋租赁费C',
                        money: '3333,456.00',
                        tollStartDate: '2017-01-01',
                        tollDeadline: '2017-03-31',
                        payDate: '2017-04-10',
                        showDetailInfo: false,
                        detailsInfo: [
                            {
                                title: '单价',
                                value: 5
                            }, {
                                title: '面积',
                                value: 400
                            }, {
                                title: '本期费用合计',
                                value: 12345.12
                            }
                        ]
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
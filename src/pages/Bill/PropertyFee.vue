// '费用账单' - 物业管理费
<template lang="pug">
#PropertyFee.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
    CostList(
        v-bind:briefListObj="CostListBrief"
        v-bind:detailHeaderArr="CostDetailHeader"
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
                listIcon: require( '../../assets/images/iconPyTitle@2x.png' ),
                listIconColor: 'rgb( 16, 142, 233 )',
                hasDetailList: true,               // 是否显示 '详情列表'
                // 列表数组
                listArr: [
                    {
                        title: '物业管理费A',
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
                        ],
                        detailList: [
                            {
                                detailListTitle: [
                                    '物业费', '4.85元/㎡ 月', 123456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '电梯费', '1.35元/㎡ 月', 456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '空调费', '0.39元/㎡ 月', 3456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '水费', '1.23元/㎡ 月', 56.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '违约金', 56.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '已收金额', 26.00
                                ],
                                detailListCheck: false
                            }
                        ]
                    }, {
                        title: '物业管理费B',
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
                        ],
                        detailList: [
                            {
                                detailListTitle: [
                                    '物业费', '4.85元/㎡ 月', 123456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '电梯费', '1.35元/㎡ 月', 456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '空调费', '0.39元/㎡ 月', 3456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '水费', '1.23元/㎡ 月', 56.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '违约金', 56.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '已收金额', 26.00
                                ],
                                detailListCheck: false
                            }
                        ]
                    }, {
                        title: '物业管理费C',
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
                        ],
                        detailList: [
                            {
                                detailListTitle: [
                                    '物业费', '4.85元/㎡ 月', 123456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '电梯费', '1.35元/㎡ 月', 456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '空调费', '0.39元/㎡ 月', 3456.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '水费', '1.23元/㎡ 月', 56.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '违约金', 56.00
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '已收金额', 26.00
                                ],
                                detailListCheck: false
                            }
                        ]
                    }
                ]
            },
            // 费用列表 - 详情列表( 展开样式 )
            CostDetailHeader: [ '费用类别', '单价', '金额( 元 )' ]
        }
    },
    mounted: function() {
        this.requirePropertyFee()       // 请求 - 物业管理费
    },
    components: components
}
</script>
// '费用账单' - 电费
<template lang="pug">
#ElectricityBill.bill--backgroundColor
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
                listIcon: require( '../../assets/images/iconEleTitle@2x.png' ),
                listIconColor: 'rgb( 255, 111, 77 )',
                hasDetailList: true,                                // 是否显示 '详情列表'
                hasDetailListCheck: true,                           // 是否显示 '详情列表 - 具体账单'
                // 列表数组
                listArr: [
                    {
                        title: '电费A',
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
                            {                                               // 第一个
                                detailListTitle: [
                                    '招商银行正式用电', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '上次抄表度数',
                                        val: 736990
                                    }, {
                                        keyName: '本次抄表度数',
                                        val: 745353
                                    }, {
                                        keyName: '电量( Kwh )',
                                        val: 8363
                                    }, {
                                        keyName: '变化',
                                        val: 1
                                    }, {
                                        keyName: '电损10%',
                                        val: 936.3
                                    }, {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '峰谷比例',
                                        val: 1
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }, {
                                        keyName: '备注',
                                        val: `此处是备注信息此处是备注信息
                                                此处是备注信息此处是备注信息
                                                此处是备注信息`
                                    }
                                ]
                            }, {                                            // 第二个
                                detailListTitle: [
                                    '招商银行外置空调用电', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '上次抄表度数',
                                        val: 736990
                                    }, {
                                        keyName: '本次抄表度数',
                                        val: 745353
                                    }, {
                                        keyName: '电量( Kwh )',
                                        val: 8363
                                    }, {
                                        keyName: '变化',
                                        val: 1
                                    }, {
                                        keyName: '电损10%',
                                        val: 936.3
                                    }, {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '峰谷比例',
                                        val: 1
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }, {
                                        keyName: '备注',
                                        val: `此处是备注信息此处是备注信息
                                                此处是备注信息此处是备注信息
                                                此处是备注信息`
                                    }
                                ]
                            }, {
                                detailListTitle: [
                                    '上月差额', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }
                                ]
                            }, {
                                detailListTitle: [
                                    '违约金名称', 900.33
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '已收金额', 26
                                ],
                                detailListCheck: false
                            }
                        ]
                    }, {
                        title: '电费B',
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
                            {                                               // 第一个
                                detailListTitle: [
                                    '招商银行正式用电', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '上次抄表度数',
                                        val: 736990
                                    }, {
                                        keyName: '本次抄表度数',
                                        val: 745353
                                    }, {
                                        keyName: '电量( Kwh )',
                                        val: 8363
                                    }, {
                                        keyName: '变化',
                                        val: 1
                                    }, {
                                        keyName: '电损10%',
                                        val: 936.3
                                    }, {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '峰谷比例',
                                        val: 1
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }, {
                                        keyName: '备注',
                                        val: `此处是备注信息此处是备注信息
                                                此处是备注信息此处是备注信息
                                                此处是备注信息`
                                    }
                                ]
                            }, {                                            // 第二个
                                detailListTitle: [
                                    '招商银行外置空调用电', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '上次抄表度数',
                                        val: 736990
                                    }, {
                                        keyName: '本次抄表度数',
                                        val: 745353
                                    }, {
                                        keyName: '电量( Kwh )',
                                        val: 8363
                                    }, {
                                        keyName: '变化',
                                        val: 1
                                    }, {
                                        keyName: '电损10%',
                                        val: 936.3
                                    }, {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '峰谷比例',
                                        val: 1
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }, {
                                        keyName: '备注',
                                        val: `此处是备注信息此处是备注信息
                                                此处是备注信息此处是备注信息
                                                此处是备注信息`
                                    }
                                ]
                            }, {
                                detailListTitle: [
                                    '上月差额', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }
                                ]
                            }, {
                                detailListTitle: [
                                    '违约金名称', 900.33
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '已收金额', 26
                                ],
                                detailListCheck: false
                            }
                        ]
                    }, {
                        title: '电费C',
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
                            {                                               // 第一个
                                detailListTitle: [
                                    '招商银行正式用电', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '上次抄表度数',
                                        val: 736990
                                    }, {
                                        keyName: '本次抄表度数',
                                        val: 745353
                                    }, {
                                        keyName: '电量( Kwh )',
                                        val: 8363
                                    }, {
                                        keyName: '变化',
                                        val: 1
                                    }, {
                                        keyName: '电损10%',
                                        val: 936.3
                                    }, {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '峰谷比例',
                                        val: 1
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }, {
                                        keyName: '备注',
                                        val: `此处是备注信息此处是备注信息
                                                此处是备注信息此处是备注信息
                                                此处是备注信息`
                                    }
                                ]
                            }, {                                            // 第二个
                                detailListTitle: [
                                    '招商银行外置空调用电', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '上次抄表度数',
                                        val: 736990
                                    }, {
                                        keyName: '本次抄表度数',
                                        val: 745353
                                    }, {
                                        keyName: '电量( Kwh )',
                                        val: 8363
                                    }, {
                                        keyName: '变化',
                                        val: 1
                                    }, {
                                        keyName: '电损10%',
                                        val: 936.3
                                    }, {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '峰谷比例',
                                        val: 1
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }, {
                                        keyName: '备注',
                                        val: `此处是备注信息此处是备注信息
                                                此处是备注信息此处是备注信息
                                                此处是备注信息`
                                    }
                                ]
                            }, {
                                detailListTitle: [
                                    '上月差额', 8003.39
                                ],
                                detailListCheck: [
                                    {
                                        keyName: '总电量',
                                        val: 9199.3
                                    }, {
                                        keyName: '单价',
                                        val: 0.87
                                    }
                                ]
                            }, {
                                detailListTitle: [
                                    '违约金名称', 900.33
                                ],
                                detailListCheck: false
                            }, {
                                detailListTitle: [
                                    '已收金额', 26
                                ],
                                detailListCheck: false
                            }
                        ]
                    }
                ]
            },
            // 费用列表 - 详情列表( 展开样式 )
            CostDetailHeader: [ '费用类别', '金额( 元 )' ] 
        }
    },
    mounted: function() {
        this.requireElectricityBill()       // 请求 - 电费
    },
    components: components
}
</script>
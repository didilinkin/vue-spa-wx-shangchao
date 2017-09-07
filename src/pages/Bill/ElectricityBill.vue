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
import { mapGetters }   from 'vuex'
import BillHeader       from '../../components/Bill/BillHeader'
import CostList         from '../../components/Bill/CostList'
const components = { BillHeader, CostList }

export default {
    name: 'ElectricityBill',
    methods: {
        // 目的: 请求 - 电费
        requireElectricityBill() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_ELE_FEE'
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '未交金额合计',
                money: '123,456.00'
            },
            // 费用列表 - 简要( 收起样式 展示 )
            CostListBrief: {
                showNullBill: false,                                // 是否显示 '空账单'
                listIcon: require( '../../assets/images/iconEleTitle@2x.png' ),
                listIconColor: 'rgb( 255, 111, 77 )',
                hasDetailList: true,                                // 是否显示 '详情列表'
                hasDetailListCheck: true,                           // 是否显示 '详情列表 - 具体账单'
                // 列表数组
                listArr: [

                ]
            },
            // 费用列表 - 详情列表( 展开样式 )
            CostDetailHeader: [ '费用类别', '金额( 元 )' ]
        }
    },
    computed: mapGetters({
        getterEleInfo: 'getterEleInfo',
        getterSumEleInfo: 'getterSumEleInfo'
    }),
    watch: {
        getterEleInfo: function() {
            this.$data.CostListBrief.listArr = this.getterEleInfo
            this.$data.BillHeaderObj.money = this.getterSumEleInfo
        }
    },
    mounted: function() {
        this.requireElectricityBill()       // 请求 - 电费
    },
    components: components
}
</script>

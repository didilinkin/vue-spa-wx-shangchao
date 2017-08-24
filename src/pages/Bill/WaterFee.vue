// '费用账单' - 水费
<template lang="pug">
#WaterFee.bill--backgroundColor
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
                showNullBill: false,                                        // 是否显示 '空账单'
                listIcon: require( '../../assets/images/iconWaterTitle@2x.png' ),
                listIconColor: 'rgb( 47, 163, 255 )',
                hasDetailList: true,               // 是否显示 '详情列表'
                // 列表数组
                listArr: [

                ]
            },
            // 费用列表 - 详情列表( 展开样式 )
            CostDetailHeader: [ '费用类别', '金额( 元 )' ]
        }
    },
    computed: mapGetters({
        getterWaterInfo: 'getterWaterInfo',
        getterSumWaterInfo: 'getterSumWaterInfo'
    }),
    watch: {
        getterWaterInfo: function() {
            this.$data.CostListBrief.listArr = this.getterWaterInfo
            this.$data.BillHeaderObj.money = this.getterSumWaterInfo
        }
    },
    mounted: function() {
        this.requireWaterFee()       // 请求 - 水费
    },
    components: components
}
</script>

// '费用账单' - 水费
<template lang="pug">
#WaterFee.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
    CostList(
        v-bind:briefListObj="CostListBrief"
        v-bind:detailHeaderArr="CostDetailHeader"
    )
    #vueLoading.vue-loading
        vue-loading(
        type="bars"
        color="#20a0ff"
    )
</template>

<script>
/* global require: true */
import { mapGetters }   from 'vuex'
import vueLoading       from 'vue-loading-template'

import BillHeader       from '../../components/Bill/BillHeader'
import CostList         from '../../components/Bill/CostList'
const components = { BillHeader, CostList, vueLoading }

export default {
    name: 'WaterFee',
    methods: {
        // 目的: 请求 - 水费
        requireWaterFee() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_WATER_FEE',
                clientNum: this.$store.state.bill.clientNum
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '未交金额合计',
                money: ''
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
            let loading = document.getElementById( 'vueLoading' )
            console.log( '4444444444444444444444' )
            loading.style.display = 'none'
        }
    },
    mounted: function() {
        this.requireWaterFee()       // 请求 - 水费
    },
    components: components
}
</script>

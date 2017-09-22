// '费用账单' - 电费
<template lang="pug">
#ElectricityBill.bill--backgroundColor
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
    name: 'ElectricityBill',
    methods: {
        // 目的: 请求 - 电费
        requireElectricityBill() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_ELE_FEE',
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
            let loading = document.getElementById( 'vueLoading' )
            console.log( '333333333333333333333333333' )
            loading.style.display = 'none'
        }
    },
    mounted: function() {
        this.requireElectricityBill()       // 请求 - 电费
    },
    components: components
}
</script>
<style lang="sass">
    .vue-loading
        padding-top: 100px
        width: 100%
        height: 100%
        display: block
        padding-top: 100px
        width: 100%
        height: 100%
        display: block
        position: absolute
        left: 0
        top: 0
        background-color: #F7F7FA
        padding-left: 35%
        padding-top: 50%
</style>

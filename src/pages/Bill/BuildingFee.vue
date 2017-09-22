// '费用账单' - 房屋租赁费
<template lang="pug">
#BuildingFee.bill--backgroundColor
    BillHeader( v-bind:contentObj="BillHeaderObj" )
    // v-on:watchDetailInfo="setDetailIndex"
    CostList(
        v-bind:briefListObj="CostListBrief"
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
    name: 'BuildingFee',
    methods: {
        // 目的: 请求 - 账单详情
        requireBuildingFee() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_RENT_FEE',
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
                showNullBill: false,                            // 是否显示 '空账单'
                listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                listIconColor: 'rgb( 255, 181, 0 )',
                hasDetailList: false,                           // 是否显示 '详情列表': 否
                // 列表数组
                listArr: [

                ]
            }

        }
    },
    computed: mapGetters({
        getterRentInfo: 'getterRentInfo',
        getterSumRent: 'getterSumRent'
    }),
    watch: {
        getterRentInfo: function() {
            this.$data.CostListBrief.listArr = this.getterRentInfo
            this.$data.BillHeaderObj.money = this.getterSumRent
            let loading = document.getElementById( 'vueLoading' )
            console.log( '1111111111111111111111111' )
            loading.style.display = 'none'
            console.log( this.getterSumRent )
        }
    },
    mounted: function() {
        this.requireBuildingFee()       // 请求 - 账单详情
    },
    components: components
}
</script>
<style lang="sass">
    .vue-loading
        width: 55%
        height: 61%
        display: block
        position: absolute
        left: 0
        top: 0
        background-color: #F7F7FA
        padding-left: 45%
        padding-top: 69%
</style>

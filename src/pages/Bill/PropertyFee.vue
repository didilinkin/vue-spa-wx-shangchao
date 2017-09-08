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
import { mapGetters }   from 'vuex'
import BillHeader       from '../../components/Bill/BillHeader'
import CostList         from '../../components/Bill/CostList'
const components = { BillHeader, CostList }

export default {
    name: 'PropertyFee',
    methods: {
        // 目的: 请求 - 物业管理费
        requirePropertyFee() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_PM_FEE',
                clientNum: this.$data.clientNum
            })
        }
    },
    data() {
        return {
            BillHeaderObj: {
                title: '物业管理费',
                money: '123,456.00'
            },
            // 费用列表 - 简要( 收起样式 展示 )
            CostListBrief: {
                showNullBill: false,                                        // 是否显示 '空账单'
                listIcon: require( '../../assets/images/iconPyTitle@2x.png' ),
                listIconColor: 'rgb( 16, 142, 233 )',
                hasDetailList: true,               // 是否显示 '详情列表'
                // 列表数组
                listArr: [

                ]
            },
            // 费用列表 - 详情列表( 展开样式 )
            CostDetailHeader: [ '费用类别', '单价', '金额( 元 )' ],
            clientNum: '1'
        }
    },
    computed: mapGetters({
        getterpmInfo: 'getterpmInfo',
        getterSumPmInfo: 'getterSumPmInfo'
    }),
    watch: {
        getterpmInfo: function() {
//            this.$data.listArr = this.getterRentInfo
//            console.log( '888888888888' )
//            console.log( this.getterRentInfo )
            this.$data.CostListBrief.listArr = this.getterpmInfo
            this.$data.BillHeaderObj.money = this.getterSumPmInfo
            this.$data.BillHeaderObj.clientNum = this.$route.query.openId
        }
    },
    mounted: function() {
        this.requirePropertyFee()       // 请求 - 物业管理费
    },
    components: components
}
</script>

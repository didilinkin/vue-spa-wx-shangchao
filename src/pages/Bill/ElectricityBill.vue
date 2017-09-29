// '费用账单' - 电费
<template lang="pug">
    #ElectricityBill.bill--backgroundColor
        BillHeader( v-bind:contentObj="BillHeaderObj" )
        CostList(
            v-bind:briefListObj="CostListBrief"
            v-bind:detailHeaderArr="CostDetailHeader"
        )
        #vueLoading.vuee-loading
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
            },
            // 目的: 请求 - 电费
            requireElectricityBillH() {
                this.$store.dispatch({
                    type: 'bill/REQUIRE_ELE_FEE_H',
                    clientNum: this.$store.state.bill.clientNum
                })
            }
//            pushHistory() {
//                let state = {
//                    title: 'title',
//                    url: '#/'
//                }
//                window.history.pushState( state, 'title', '#' )
//            }
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
                    // 未交列表数组
                    listArr: [

                    ],
                    // 已交列表数组
                    listArrH: [

                    ]
                },
                // 费用列表 - 详情列表( 展开样式 )
                CostDetailHeader: [ '费用类别', '金额( 元 )' ]
            }
        },
        computed: mapGetters({
            getterEleInfo: 'getterEleInfo',
            getterEleInfoH: 'getterEleInfoH',
            getterSumEleInfo: 'getterSumEleInfo'
        }),
        watch: {
            getterEleInfo: function() {
                this.$data.CostListBrief.listArr = this.getterEleInfo
                this.$data.BillHeaderObj.money = this.getterSumEleInfo
                let loading = document.getElementById( 'vueLoading' )
                loading.style.display = 'none'
                if( this.$data.CostListBrief.listArr.length === 0 ) {
                    let notbill = document.getElementById( 'notbill' )
                    notbill.style.display = 'block'
                }
            },
            getterEleInfoH: function() {
                this.$data.CostListBrief.listArrH = this.getterEleInfoH
//                if( this.$data.CostListBrief.listArr.length === 0 && this.$data.CostListBrief.listArrH.length === 0 ) {
//                    this.$router.push({path: '/Billnotext'})
//                }
                if( this.$data.CostListBrief.listArrH.length === 0 ) {
                    let twobill = document.getElementById( 'twobill' )
                    twobill.style.display = 'block'
                }
            }
        },
        mounted: function() {
            this.requireElectricityBill()       // 请求 - 电费
            this.requireElectricityBillH()       // 请求 - 电费
//            this.pushHistory()
        },
        components: components
    }
</script>


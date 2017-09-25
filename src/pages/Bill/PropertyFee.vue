// '费用账单' - 物业管理费
<template lang="pug">
    #PropertyFee.bill--backgroundColor
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
        name: 'PropertyFee',
        methods: {
            // 目的: 请求 - 物业管理费
            requirePropertyFee() {
                this.$store.dispatch({
                    type: 'bill/REQUIRE_PM_FEE',
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
                    listIcon: require( '../../assets/images/iconPyTitle@2x.png' ),
                    listIconColor: 'rgb( 16, 142, 233 )',
                    hasDetailList: true,               // 是否显示 '详情列表'
                    // 列表数组
                    listArr: [

                    ]
                },
                // 费用列表 - 详情列表( 展开样式 )
                CostDetailHeader: [ '费用类别', '单价', '金额( 元 )' ]
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
                let loading = document.getElementById( 'vueLoading' )
                console.log( '22222222222222' )
                loading.style.display = 'none'
                if( this.$data.CostListBrief.listArr.length === 0 ) {
                    this.$router.push({path: '/BillNotext'})
                }
            }
        },
        mounted: function() {
            this.requirePropertyFee()       // 请求 - 物业管理费
        },
        components: components
    }
</script>


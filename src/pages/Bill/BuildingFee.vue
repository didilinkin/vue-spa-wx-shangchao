// '费用账单' - 房屋租赁费
<template lang="pug">
    #BuildingFee.bill--backgroundColor
        BillHeader( v-bind:contentObj="BillHeaderObj" )
        // v-on:watchDetailInfo="setDetailIndex"
        CostList(
            v-bind:briefListObj="CostListBrief"
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
    import ContentNull      from '../../components/common/ContentNull'
    import CostList         from '../../components/Bill/CostList'
    const components = { BillHeader, CostList, vueLoading, ContentNull }

    export default {
        name: 'BuildingFee',
        methods: {
            // 目的: 请求 - 账单详情
            requireBuildingFee() {
                this.$store.dispatch({
                    type: 'bill/REQUIRE_RENT_FEE',
                    clientNum: 'o0CuEuD9L-YlwNO5nKEMUjK2zauY'
                })
            },
            pushHistory() {
                let state = {
                    title: 'title',
                    url: '#/'
                }
                window.history.pushState( state, 'title', '#' )
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
                loading.style.display = 'none'
                if( this.$data.CostListBrief.listArr.length === 0 ) {
                    this.$router.push( '/BillNotext' )
                }
            }
        },
        mounted: function() {
            this.requireBuildingFee()       // 请求 - 账单详情
            this.pushHistory()
        },
        components: components
    }
</script>
<style lang="sass">
    .vuee-loading
        width: 100%
        height: 100%
        background-color: #ffffff
        line-height: 100%
        z-index: 999
        padding-top: 70%
        position: absolute
        top: 0
        left: 0
</style>

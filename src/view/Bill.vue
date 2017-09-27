// 绑定房间
<template lang="pug">
ul#Bill
    li.auto--modulePadding.auto--moduleMarginBottom(
        v-for="( item, index ) in billDataObj.listArr"
        v-bind:key="item.id"
        v-on:click="toBillDetails( item.id )"
    )
        .Bill--imgBox
            img( v-bind:src="item.iconImg" )
        .Bill--textBox
            h2.auto--titleStyle.titleT {{ item.title }}
            span.auto--assistStyle {{ item.text }}
            span.auto--assistStyle( v-if="index < 5" ) {{ item.data }}
            span.auto--assistStyle( v-else ) {{ item.value }} 元
        .Bill--iconBox
            img( v-bind:src="billDataObj.listArrowImg" )
</template>

<script>
import { dataBillObj }      from './dataBill'
import { mapGetters }   from 'vuex'


export default {
    name: 'Bill',
    methods: {
        // 目的: 请求 - 费用账单列表
        requireBillList() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_BILL_LIST',
                clientNum: this.$route.query.clientNum
            })
        },
        // 目的: 跳转'账单'详情页
        toBillDetails( url ) {
            location.href = '#/bill/' + url
        },

        // 目的: 修改 $data.billDataObj 静态数据 => 改为 后台获取的时间
        setDataTime( returnObj ) {
//            console.log( returnObj )
            this.$data.billDataObj.listArr[0].data = returnObj.rentDate
            this.$data.billDataObj.listArr[1].data = returnObj.pmDate
            this.$data.billDataObj.listArr[2].data = returnObj.eleDate
            this.$data.billDataObj.listArr[3].data = returnObj.waterDate
        }
    },
    data() {
        return {
            billDataObj: dataBillObj,       // 整个 $data 都以module的形式引入,
            clientNum: '1'
        }
    },
    computed: mapGetters({
        getterFeeInfo: 'getterFeeInfo',
        getterSumRent: 'getterSumRent'
    }),
    watch: {
        getterFeeInfo: function() {
            this.setDataTime( this.getterFeeInfo ) // 修改时间
            this.$data.clientNum = this.$route.query.clientNum
            this.$store.state.bill.clientNum = this.$route.query.clientNum
        },
        getterSumRent: function() {
            let loading = document.getElementById( 'vueLoading' )
            loading.style.display = 'none'
        }
    },
    mounted: function() {
        this.requireBillList()       // 请求 - 账单详情
    }
}
</script>

<style lang="sass" scoped>
@import "../sass/main"
=boxMixin( $width )
    +dib
    width: $width

#Bill
    +REL
    background-color: #fff
    height: 100%
    .Bill--imgBox
        +boxMixin( 20% )
        >img
            +imgCover( 70% )
            +REM( height, 52px )
            margin-left: 10%
    .Bill--textBox
        +boxMixin( 70% )
        >span
            +REM( margin-right, $F-text )
    .Bill--iconBox
        +boxMixin( 10% )
        >img
            +REM-imgCover( $F-title )
.Bill--textBox>span
    margin-left: 5%
.titleT
    margin-left: 5%
ul
    +bC( $C-base )
    li
        +flexCenter
        +bC( $C-W )
        +pseudoClassColor( active, $bC, darken, $C-base, 10% )
        width: 80%
        margin-left: 6%
        margin-top: 4%
        box-shadow: 0px 5px 12px 0px #d9e2e9
        +REM( padding-top, 32px )
        +REM( padding-bottom, 36px )
</style>

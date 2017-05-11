// 绑定房间
<template lang="pug">
ul#Bill
    li.auto--modulePadding.auto--moduleMarginBottom(
        v-for="( item, index ) in billDataObj.listArr"
        v-bind:key="item.id"
        @click="toBillDetails( item.id )"
    )
        .Bill--imgBox
            img( v-bind:src="item.iconImg" )   
        .Bill--textBox
            h2.auto--titleStyle {{ item.title }}
            span.auto--assistStyle {{ item.text }}
            span.auto--assistStyle( v-if="index < 5" ) {{ item.data }}
            span.auto--assistStyle( v-else ) {{ item.value }} 元
        .Bill--iconBox
            img( v-bind:src="billDataObj.listArrowImg" )
</template>

<script>
import { dataBillObj }      from './dataBill'

export default {
    name: 'Bill',
    methods: {
        // 目的: 请求 - 费用账单列表
        requireBillList() {
            this.$store.dispatch({
                type: 'bill/REQUIRE_BILL_LIST'
            })
        },
        // 目的: 跳转'账单'详情页
        toBillDetails( url ) {
            location.href = '#/bill/' + url
        }
    },
    data() {
        return {
            billDataObj: dataBillObj        // 整个 $data 都以module的形式引入
        }
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
    +bC( $C-base )
    .Bill--imgBox
        +boxMixin( 20% )
        >img
            +imgCover( 70% )
    .Bill--textBox
        +boxMixin( 70% )
        >span
            +REM( margin-right, $F-text )
    .Bill--iconBox
        +boxMixin( 10% )
        >img
            +REM-imgCover( $F-title )
ul
    +bC( $C-base )
    li
        +flexCenter
        +bC( $C-W )
        +pseudoClassColor( active, $bC, darken, $C-base, 10% )
</style>

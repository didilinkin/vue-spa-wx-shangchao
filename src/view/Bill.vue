// 绑定房间
<template lang="pug">
ul#Bill
    li.auto--modulePadding.auto--moduleMarginBottom(
        v-for="( item, index ) in billListArr"
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
            img( v-bind:src="listArrowImg" )
</template>

<script>
/* global require: true */ 
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
            console.log( url )
        }
    },
    data() {
        return {
            billListArr: [
                {   
                    id: 'BuildingFee',
                    iconImg: require( '../assets/images/iconHousing@2x.png' ),
                    title: '房屋租赁费',
                    text: '交费期限',
                    data: '2017-02-21'
                }, {
                    id: 'PropertyFee',
                    iconImg: require( '../assets/images/iconProperty@2x.png' ),
                    title: '物业管理费',
                    text: '交费期限',
                    data: '2017-02-21'
                }, {
                    id: 'ElectricityBill',
                    iconImg: require( '../assets/images/iconElectricity@2x.png' ),
                    title: '电费',
                    text: '交费期限',
                    data: '2017-02-21'
                }, {
                    id: 'WaterFee',
                    iconImg: require( '../assets/images/iconWater@2x.png' ),
                    title: '水费',
                    text: '交费期限',
                    data: '2017-02-21'
                }, {
                    id: 'LeaseDeposit',
                    iconImg: require( '../assets/images/iconMargin@2x.png' ),
                    title: '租赁保证金',
                    text: '交费期限',
                    data: '2017-02-21'
                }, {
                    id: 'EnergyDeposit',
                    iconImg: require( '../assets/images/iconEnergy@2x.png' ),
                    title: '能源管理押金',
                    text: '当前结余',
                    value: '123,456.00'
                }, {
                    id: 'DecorationDeposit',
                    iconImg: require( '../assets/images/iconDecorate@2x.png' ),
                    title: '装修保证金',
                    text: '当前结余',
                    value: '123,456.00'
                }
            ],
            // 单箭头图标图片
            listArrowImg: require( '../assets/images/iconListArrow@2x.png' ) 
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

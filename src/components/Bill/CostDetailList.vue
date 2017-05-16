// '费用账单' - 账单详细列表 - 应用场景组件( 房屋租赁费 / 物业管理费 /  电费 / 水费 )
<template lang="pug">
ul.CostDetailList
    // 列表标题( $props: detailListHeaderArr )
    li( v-bind:style="{ fontWeight: 'bold' }" )
        .li--item(
            v-for="( item, index ) in detailListHeaderArr"
            v-bind:key="index"
        ) 
            p {{ item }}
    // 修饰线
    hr

    //  列表内容( $props: )
    .CostDetailList__contentBox(
        v-for="( arrListItem, arrListIndex ) in detailListArr"
        v-bind:key="arrListIndex"
    )
        li
            .li--item(
                v-for="( listItem, listIndex ) in arrListItem"
                v-bind:key="listItem"
            ) 
                p {{ listItem }}
        hr
</template>

<script>
export default {
    name: 'CostDetailList',
    props: {
        // 详情列表头部( 展开样式 ) - 命名添加List与父级 $props区别
        detailListHeaderArr: {
            type: Array,
            default: function() {
                return [
                    '头部标题A', '头部标题B', '头部标题C'
                ]
            }
        },
        // 详情列表 - 内容
        detailListArr: {
            type: Array,
            default: function() {
                return [
                    [ '费用A', '4.85元/㎡ 月', 123456.00 ],
                    [ '费用B', '1.35元/㎡ 月', 456.00 ]
                ]
            }
        }
    }
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

.CostDetailList
    +REM-padding-TB( $D-autoPadding )
    +bC( $C-base )
    .CostDetailList__contentBox
        &:last-child hr
            border: none

ul li
    +flexCenter
    +REM-padding-LR( $D-autoPadding )
    +REM-padding-TB( $D-autoPadding )
    +bC( $C-W )
    >.li--item
        flex: 1
        +textCenter
        &:first-child
            text-align: left
            >p
                +fW( bold )
        &:last-child
            text-align: right
        >p
            +REM-fontStyle( $F-text, $C-title )

// 修饰线
hr 
    +REM-margin-LR( $D-autoMargin )
    border: none
    +borderBottom( $C-line )

</style>

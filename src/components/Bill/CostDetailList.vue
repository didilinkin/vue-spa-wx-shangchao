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

    //  详情账单列表内容( $props: )
    .CostDetailList__contentBox(
        v-for="( arrListItem, arrListIndex ) in detailListArr"
        v-bind:key="arrListIndex"
    )
        li( @click="openDetailCheck( arrListIndex )" )
            // 详情账单列表内容 - 标题
            .li--item(
                v-for="( listItem, listIndex ) in arrListItem.detailListTitle"
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
                    {                                               // 第一个
                        detailListTitle: [
                            '招商银行正式用电', 8003.39
                        ],
                        detailListCheck: [
                            {
                                keyName: '上次抄表度数',
                                val: 736990
                            }, {
                                keyName: '本次抄表度数',
                                val: 745353
                            }, {
                                keyName: '电量( Kwh )',
                                val: 8363
                            }, {
                                keyName: '变化',
                                val: 1
                            }, {
                                keyName: '电损10%',
                                val: 936.3
                            }, {
                                keyName: '总电量',
                                val: 9199.3
                            }, {
                                keyName: '峰谷比例',
                                val: 1
                            }, {
                                keyName: '单价',
                                val: 0.87
                            }, {
                                keyName: '备注',
                                val: `此处是备注信息此处是备注信息
                                        此处是备注信息此处是备注信息
                                        此处是备注信息`
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        // 点击 '详情账单列表内容' li 事件 => 打开 详情列表账单
        openDetailCheck( listIndex ) {
            console.log( listIndex )
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

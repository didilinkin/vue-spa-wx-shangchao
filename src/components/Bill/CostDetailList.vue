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

    //  详情账单列表内容( 循环$props )
    .CostDetailList__contentBox(
        v-for="( arrListItem, arrListIndex ) in renderDetailListArr"
        v-bind:key="arrListIndex"
    )
        li( @click="openDetailCheck( arrListIndex )" )
            // 详情账单列表 - 标题部分
            .li--item(
                v-for="( listItem, listIndex ) in arrListItem.detailListTitle"
                v-bind:key="listItem"
            )
                p {{ listItem }}
            // v-if 判断 li内的check数组是否为空( 如果为空 返回的将是false => v-if 隐藏 )
            img(
                v-if="arrListItem.detailListCheck"
                v-bind:src="detailListCheckIcon"
            )

        // 详情账单列表 - '具体费用'容器
        ul.detailCheckListBox( v-if="arrListItem.showDetailCheck" )
            .CostDetailList__checkItem(
                v-for="( checkItem, checkIndex ) in arrListItem.detailListCheck"
                v-bind:key="checkItem"
            )
                li.detailCheckList--item
                    // 详情账单列表 - 具体费用; 此处不能用循环来写 li--item, 需要用键值
                    .li--item
                        p {{ checkItem.keyName }}
                    .li--item
                        p {{ checkItem.val }}
                hr.detailCheckList--hr
        hr
</template>

<script>
/* global require: true */
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
                        showDetailCheck: false,                     // 折叠 - 详情账单 是否展开( 3级列表 )
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
            let arr = this.$data.renderDetailListArr                                        // 将 传入的列表数组缓存
            let showIndexBoolean = arr[listIndex].showDetailCheck                           // 将 index所在的对象中 '是否显示3级 详情账单列表'的 布尔值 临时储存

            for( let i = 0; i < arr.length; i++ ) {
                arr[i].showDetailCheck = false                                              // 将全部对象属性设为 '隐藏'
            }
            this.$data.renderDetailListArr[listIndex].showDetailCheck = !showIndexBoolean   // 将之前储存的index.show属性取反
        }
    },
    data() {
        return {
            detailListCheckIcon: require( '../../assets/images/iconListArrow@2x.png' ),
            renderDetailListArr: this.$props.detailListArr                                  // 将$props 保存在 $data( 点击事件处理'显示'逻辑 )
        }
    },
    watch: {
        // 监听: $props 传入数据; 将 $props数据保存到 $data
        detailListArr: function() {
            this.$data.renderDetailListArr = this.$props.detailListArr
            console.log( '$props传入' )
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
        &:last-child li         //隐藏已收金额div
            display: none

// '具体费用'容器 - 要与列表标题 颜色做区分
.CostDetailList__checkItem
    .detailCheckList--item
        +bC( $C-base )
    &:last-of-type
        .detailCheckList--hr
            border: none

ul li
    +flexCenter
    +REM-padding-LR( $D-autoPadding )
    +REM-padding-TB( $D-autoPadding )
    +bC( $C-W )
    >.li--item
        flex: 1
        +textCenter
        >p
            +REM-fontStyle( $F-text, $C-title )
        &:first-of-type
            text-align: left
            >p
                +fW( bold )
        &:last-of-type
            text-align: right
    // 详情账单列表 可展开箭头图标
    >img
        +REM-W-H( $F-text )
        +REM( margin-left, $F-text )
        transform: rotate( 90deg )

// 修饰线
hr
    +REM-margin-LR( $D-autoMargin )
    border: none
    +borderBottom( $C-line )
</style>

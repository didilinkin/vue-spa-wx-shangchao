// '费用账单' - 账单费用组件 - 应用场景组件( 房屋租赁费 / 物业管理费 /  电费 / 水费 )
<template lang="pug">
ul.CostList
    // 直接判断 $props是否显示, 不需要经过 $data
    li.CostList--nullBill( v-if="briefListObj.showNullBill" )
        img(
            v-bind:srcset="nullBillImgObj.normal + ' 1x,' + nullBillImgObj.retina + ' 2x'"
        )
        h2.auto--textStyle 抱歉！暂无账单~

    // '账单费用' 如果非空, 显示列表内容
    li.auto--moduleMarginBottom(
        v-else
        v-for="( item, index ) in renderListObj.listArr"
        v-bind:key="index"
        v-bind:style="{ backgroundColor: '#FFF' }"
    )
        // 非折叠 - 专属图标信息
        .CostList__iconBox.auto--moduleIconBox(
            v-bind:style="{ backgroundColor: briefListObj.listIconColor }"
        )
            img( v-bind:src="briefListObj.listIcon" )

        // 非折叠 - 基本信息
        .CostList__contentBox( @click="showCostInfo( index )" )
            .CostList__contentBox__title
                h2 {{ item.title }}
                h2
                    b {{ item.money }}
                img.CostList--arrowIcon( v-bind:src="costListArrowIcon" )
            .CostList__contentBox__date
                .CostList--text
                    span 收费周期
                    span {{ item.tollStartDate }}
                    span 至
                    span {{ item.tollDeadline }}
                .CostList--text
                    span 交费期限
                    span {{ item.payDate }}

        // 折叠 - 详情账单列表( '房屋租赁费'不显示 此模块 )
        CostDetailList(
            v-if="briefListObj.hasDetailList"
            v-show="item.showDetailInfo"
            v-bind:detailListHeaderArr="detailHeaderArr"
            v-bind:detailListArr="item.detailList"
        )

        // 折叠 - 账单详细信息
        .CostList__detailsInfo.auto--modulePaddingTB( v-show="item.showDetailInfo" )
            // 价格 + 合计数值等
            .CostList__detailsInfo__item.auto--modulePaddingTB(
                v-for="( itemInfo, indexInfo ) in item.detailsInfo"
                v-bind:key="indexInfo"
            )
                p {{ itemInfo.title }}
                p {{ itemInfo.value }}
</template>

<script>
/* global require: true */
import CostDetailList       from    './CostDetailList'
const components = { CostDetailList }

export default {
    name: 'CostList',
    props: {
        // 简要列表( 收起样式 )
        briefListObj: {
            type: Object,
            default: function() {
                return {
                    showNullBill: false,                                        // 是否显示 '空账单'
                    listIcon: require( '../../assets/images/iconHousTitle@2x.png' ),
                    listIconColor: 'rgb( 255, 181, 0 )',
                    listArr: [
                        {
                            title: '账单费用',
                            money: '1111',
                            tollStartDate: '2017-01-01',
                            tollDeadline: '2017-03-31',
                            payDate: '2017-04-10',
                            showDetailInfo: false,                              // 折叠 - 信息 是否展开( 2级列表 )
                            detailsInfo: [
                                {
                                    title: '标题A',
                                    value: 5
                                }, {
                                    title: '标题B',
                                    value: 400
                                }, {
                                    title: '标题C',
                                    value: 12345.12
                                }
                            ],
                            detailList: [
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
                    ],
                    hasDetailList: false    // 是否显示 '详情列表': 否
                }
            }
        },
        // 详情列表头部( 展开样式 )
        detailHeaderArr: {
            type: Array,
            default: function() {
                return [
                    '头部标题A', '头部标题B', '头部标题C'
                ]
            }
        }
    },
    methods: {
        // 目的: 展示 '账单'详情( 根据index 进行展示 )
        showCostInfo( index ) {
            let arr = this.$data.renderListObj.listArr                                      // 储存一个数组
            let showIndexBoolean = arr[index].showDetailInfo

            for( let i = 0; i < arr.length; i++ ) {                                         // 将全部对象属性设为 '隐藏'
                arr[i].showDetailInfo = false
            }
            this.$data.renderListObj.listArr[index].showDetailInfo = !showIndexBoolean      // 将之前储存的index.show属性取反
        }
    },
    data() {
        return {
            renderListObj: this.$props.briefListObj,                                        // 将$props 保存在 $data( 点击事件处理'显示'逻辑 )
            costListArrowIcon: require( '../../assets/images/iconListArrow@2x.png' ),       // 箭头
            showInfoIndex: 0,                                                               // 无显示 => 空
            nullBillImgObj: {
                normal: require( '../../assets/images/billno@2x.png' ),
                retina: require( '../../assets/images/billno@3x.png' )
            }
        }
    },
    watch: {
        briefListObj: function() {
            this.$data.renderListObj = this.$props.briefListObj                             // 赋值: 将 $props => $data
        }
    },
    components: components
}
</script>

<style lang="sass" scoped>
@import "../../sass/main"

.CostList
    +REL
    .CostList__iconBox >img
        padding: 20%
        +imgCover( 60% )
    .CostList__contentBox
        +REM( margin-left, ( $D-autoMargin*2 + $F-big-title*1.5 ) )
        +REM( padding, $D-autoPadding )
        padding-left: 0

// 标题 + 金额
.CostList__contentBox__title
    +REL
    +REM( padding-bottom, $D-autoPadding/2 )
    +borderBottom( $C-line )
    h2
        +dib
        +REM-fontStyle( $F-big-title/2, $C-title )
        &:first-child
            width: 50%
    >img
        // margin-left: 5%
        +ABS
        right: 0
        top: 15%
        +REM-W-H( $F-text )
        +imgAlign( baseline )
        transform: rotate( 90deg )

// 日期内容
.CostList__contentBox__date
    +REM( padding-top, $D-autoPadding/2 )
    span
        +REM( margin-right, $F-assist/2 )
        +REM-fontStyle( $F-assist, $C-copy )

// 折叠 - 账单详细信息
.CostList__detailsInfo
    +flexCenter
    +bC( $C-base )
    >.CostList__detailsInfo__item
        flex: 1
        +bC( $C-W )
        +textCenter
        >p
            +REM-fontStyle( $F-text, $C-title )
            &:first-child
                +REM( margin-bottom, $D-autoMargin/2 )

// '空账单' - 居中图
.CostList--nullBill
    +textCenter
    +pT( 10% )

</style>

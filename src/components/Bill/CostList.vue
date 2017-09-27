// '费用账单' - 账单费用组件 - 应用场景组件( 房屋租赁费 / 物业管理费 /  电费 / 水费 )
<template lang="pug">
ul.CostList
    li.billAB
        a.billA(
            @click="get()"
            v-bind:class='{ active: weijiao }'
        ) 未交账单
        a.billA(
            @click="set()"
            v-bind:class='{ active: yijiao }'
        ) 已交账单
    div.Nobill(
        v-show="weijiao"
    )
        // 直接判断 $props是否显示, 不需要经过 $data
        li.CostList--nullBill( v-if="briefListObj.showNullBill" )
            ContentNull( v-bind:setContentNullObj="setContentNull" )
        // '账单费用' 如果非空, 显示列表内容
        li.auto--moduleMarginBottom(
            v-else
            v-for="( item, index ) in renderListObj.listArr"
            v-bind:key="index"
            v-bind:style="{ backgroundColor: '#FFF' }"
        )
            // 非折叠 - 专属图标信息
            <!--.CostList__iconBox.auto&#45;&#45;moduleIconBox(-->
                <!--v-bind:style="{ backgroundColor: briefListObj.listIconColor }"-->
            <!--)-->
                <!--img( v-bind:src="briefListObj.listIcon" )-->

            // 非折叠 - 基本信息
            .CostList__contentBox( @click="showCostInfo( index )" )
                .CostList__contentBox__title
                    h2 {{ item.title }}
                    h2
                        b.cl {{ item.money }}
                    img.CostList--arrowIcon( v-bind:src="costListArrowIcon" )
                .CostList__contentBox__date
                    .CostList--text
                        span 收费周期
                        span {{ item.tollStartDate }}
                        span 至
                        span {{ item.tollDeadline }}
                    .CostList--text.spendT
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
                    p.ficl {{ itemInfo.value }}
    div.Noright(
        v-show="yijiao"
    )
        // 直接判断 $props是否显示, 不需要经过 $data
        li.CostList--nullBill( v-if="briefListObj.showNullBill" )
            ContentNull( v-bind:setContentNullObj="setContentNull" )
        // '账单费用' 如果非空, 显示列表内容
        li.auto--moduleMarginBottom(
        v-else
        v-for="( item, index ) in renderListObj.listArrH"
        v-bind:key="index"
        v-bind:style="{ backgroundColor: '#FFF' }"
        )
            // 非折叠 - 专属图标信息
            <!--.CostList__iconBox.auto&#45;&#45;moduleIconBox(-->
            <!--v-bind:style="{ backgroundColor: briefListObj.listIconColor }"-->
            <!--)-->
            <!--img( v-bind:src="briefListObj.listIcon" )-->

            // 非折叠 - 基本信息
            .CostList__contentBox( @click="showCostInfoH( index )" )
                .CostList__contentBox__title
                    h2 {{ item.title }}
                    h2
                        b.cl {{ item.money }}
                    img.CostList--arrowIcon( v-bind:src="costListArrowIcon" )
                .CostList__contentBox__date
                    .CostList--text
                        span 收费周期
                        span {{ item.tollStartDate }}
                        span 至
                        span {{ item.tollDeadline }}
                    .CostList--text.spendT
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
                    p.ficl {{ itemInfo.value }}
</template>

<script>
/* global require: true */
import ContentNull          from    '../common/ContentNull'
import CostDetailList       from    './CostDetailList'
const components = { ContentNull, CostDetailList }

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
        },
        // 目的: 展示 '账单'详情( 根据index 进行展示 )
        showCostInfoH( index ) {
            let arr = this.$data.renderListObj.listArrH                                      // 储存一个数组
            let showIndexBoolean = arr[index].showDetailInfo

            for( let i = 0; i < arr.length; i++ ) {                                         // 将全部对象属性设为 '隐藏'
                arr[i].showDetailInfo = false
            }
            this.$data.renderListObj.listArrH[index].showDetailInfo = !showIndexBoolean      // 将之前储存的index.show属性取反
        },
        get: function() {
            this.weijiao = true,
            this.yijiao = false
        },
        set: function() {
            this.weijiao = false,
            this.yijiao = true
        }
    },
    data() {
        return {
            weijiao: true,
            yijiao: false,
            renderListObj: this.$props.briefListObj,                                        // 将$props 保存在 $data( 点击事件处理'显示'逻辑 )
            costListArrowIcon: require( '../../assets/images/iconListArrow@2x.png' ),       // 箭头
            showInfoIndex: 0,                                                               // 无显示 => 空
            setContentNull: {                                                               // '内容为空' 渲染内容
                contentImg: {
                    normal: require( '../../assets/images/billno@2x.png' ),
                    retina: require( '../../assets/images/billno@3x.png' )
                },
                contentTitle: '抱歉！暂无账单~'
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
.billAB
    background-color: #ffffff
    box-shadow: 0px 5px 12px 0px #d9e2e9
a
    text-decoration: none
.active
    border-bottom: 1px solid #515151
    color: black !important
.billA
    width: 50%
    display: inline-block
    text-align: center
    +REM( padding-top, 15px )
    +REM( padding-bottom, 15px )
    +REM( line-height, 22px )
    +REM( font-size, 16px )
    color: #a5a5a5
.Nobill
    margin-top: 6%
    width: 90%
    margin-left: 5%
    box-shadow: 0px 5px 12px 0px #d9e2e9
.Noright
    margin-top: 6%
    width: 90%
    margin-left: 5%
    box-shadow: 0px 5px 12px 0px #d9e2e9
.CostList
    +REM( height, 490px )
    background-color: #ffffff
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
    margin-left: -25%
    +REL
    +REM( padding-bottom, $D-autoPadding/2 )
    +borderBottom( $C-line )
    +REM( padding-top, 20px )
    +REM( padding-bottom, 15px )
    h2
        +dib
        +REM-fontStyle( $F-big-title/2, $C-title )
        &:first-child
            width: 50%
            +REM( font-size, 20px )
        .cl
            color: rgb( 121, 132, 243 )
            +REM( font-size, 20px )
    >img
        // margin-left: 5%
        +ABS
        right: 0
        top: 15%
        +REM-W-H( $F-text )
        +imgAlign( baseline )
        transform: rotate( 90deg )
        +REM( padding-top, 33px )

// 日期内容
.CostList__contentBox__date
    margin-left: -25%
    +REM( line-height, 30px )
    +REM( padding-top, $D-autoPadding/2 )
    .spendT
        +REM( padding-bottom, 25px )
    span
        +REM( margin-right, $F-assist/2 )
        +REM-fontStyle( $F-assist, $C-copy )
        +REM( font-size, 14px )

// 折叠 - 账单详细信息
.CostList__detailsInfo
    +flexCenter
    +bC( $C-base )
    >.CostList__detailsInfo__item
        flex: 1
        +bC( $C-W )
        +textCenter
        &:first-child p         //改变颜色
            color: #666
        >p
            +REM-fontStyle( $F-text, $C-title )
            &:first-child
                +REM( margin-bottom, $D-autoMargin/2 )
        .ficl
            color: #fd741a
</style>

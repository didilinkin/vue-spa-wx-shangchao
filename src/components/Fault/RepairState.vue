// '故障报修' - 报修状态
<template lang="pug">
ul#repairState
    // $props 无内容
    li( v-if="renderNull" )
        ContentNull( v-bind:setContentNullObj="setContentNull" )

    // $props 有内容
    li.auto--moduleMarginLR.auto--modulePaddingTB(
        v-else
        v-for="( item, index ) in repairStateArr"
        v-bind:key="index"
    )
        // 状态 - 顶部
        .replaceState__header
            span.replaceState--stateBtn#repairTitle( v-bind:class="'fault--' + item.stateType + '--typeColor'" ) {{ item.stateTitle }}
            span.replaceState--dateTime#repairTime {{ item.createDate }}

        // 状态 - 文本内容
        .replaceState--contentText#repairText
            p(
                v-bind:class="{ 'clickText': canClickBoolean }"
                v-on:click="toRepairDetail( item )"
            ) {{ item.repairContent }}
</template>
<script>
/* global require: true */
import { mapGetters }   from 'vuex'

import ContentNull      from '../common/ContentNull'
const components = { ContentNull }

export default {
    name: 'repairState',
    props: {
        // '报修状态' - 渲染数组
        repairStateArr: {
            default: function() {
                return [

                ]
            }
        },
        // '报修状态' - 是否可点击
        canClickBoolean: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 目的: 点击内容文字 => 跳转 '报修详情‘ 页面
        toRepairDetail( itemObj ) {
            // 判断: 是否可点击跳转
            if( this.$props.canClickBoolean ) {
                this.saveRepairDetail( itemObj )                                // 将对象传给 $store保存( 跨组件共享 )

                this.$watch( 'canToDetail', () => {
                    location.href = '#/fault/' + itemObj.id                     // 当 $store更新后再执行跳转
                })
            }
        },
        // 目的: 将报修详情对象 保存到 $store中
        saveRepairDetail( detailObj ) {
            this.$store.dispatch({
                type: 'fault/SAVE_REPAIR_DETAIL',
                detailObj: detailObj
            })
        },
        // 目的: 判断传入的 $props 是否为空
        judgeRepairStateNull() {
            let arrLength = this.$props.repairStateArr.length
            arrLength === 0 ? this.$data.renderNull = true : this.$data.renderNull = false  // 判断是否为空
        }
    },
    data() {
        return {
            renderNull: true,                                                   // 如果 $props为空, 渲染'空' 组件
            setContentNull: {                                                   // 设置 '内容为空' 组件 内容
                contentImg: {
                    normal: require( '../../assets/images/picRecord@2x.png' ),
                    retina: require( '../../assets/images/picRecord@3x.png' )
                },
                contentTitle: '抱歉！暂时没有任何记录~'
            },
            canToDetail: false
        }
    },
    computed: mapGetters({
        getterRepairDetail: 'getterRepairDetail'
    }),
    watch: {
        // 监听: 当 $store保存成功, 放行跳转功能
        getterRepairDetail: function() {
            this.$data.canToDetail = true
        },
        // 监听: $props 传入后, 执行
        repairStateArr: function() {
            this.judgeRepairStateNull()
        }
    },
    mounted: function() {
        this.judgeRepairStateNull()
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"

#repairState
    +bC( $C-W )
    .replaceState__header
        +REM( margin-bottom, $D-autoMargin )
        .replaceState--stateBtn
            +REM-padding-TB( $D-autoPadding/4 )
            +REM-padding-LR( $D-autoPadding )
        .replaceState--dateTime
            float: right

ul
    li
        +borderBottom( $C-line )
        &:last-of-type
            border: none
        span
            +REM-fontStyle( $F-assist, $C-assist )
        p
            +REM-fontStyle( $F-text, $C-text )
            +ell-line( $F-text*1.5, 3 )
        p.clickText
            +pseudoClassColor( active, color, darken, $C-theme, 2% )
</style>

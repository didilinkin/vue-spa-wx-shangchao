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
            span.replaceState--stateBtn( v-bind:class="'fault--' + item.stateType + '--typeColor'" ) {{ item.stateTitle }}
            span.replaceState--dateTime {{ item.dateTime }}

        // 状态 - 文本内容
        .replaceState--contentText
            p {{ item.text }}
</template>

<script>
/* global require: true */ 
import ContentNull      from '../common/ContentNull'
const components = { ContentNull }

export default {
    name: 'repairState',
    props: {
        // '报修状态' - 渲染数组
        repairStateArr: {
            type: Array,
            default: function() {
                return [
                    {
                        stateType: 'submitted',                         // 状态类型
                        stateTitle: '已提交',                            // 状态标题
                        dateTime: '2016-05-25  11:46',                  // 日期时间
                        text: `此处是报修文本此处是报修文本此处是报修文本
                                此处是报修文本此处是报修文本此处是报修文本
                                此处是报修文本此处是报修文本`
                    }   
                ]
            }
        }
    },
    data() {
        return {
            renderNull: true,                                           // 如果 $props为空, 渲染'空' 组件
            setContentNull: {                                           // 设置 '内容为空' 组件 内容
                contentImg: {
                    normal: require( '../../assets/images/picRecord@2x.png' ),
                    retina: require( '../../assets/images/picRecord@3x.png' )
                },
                contentTitle: '抱歉！暂时没有任何记录~'
            }
        }
    },
    mounted: function() {
        this.$props.repairStateArr.length === 0 ? this.$data.renderNull = true : this.$data.renderNull = false
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
            +pseudoClassColor( active, color, darken, $C-theme, 2% )
</style>

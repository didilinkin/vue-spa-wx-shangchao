// 通用组件 - Fort.js文本表单( 包含状态按钮 )
<template lang="pug">
#FortForm.form-wrapper
    form( name="form" action="#" )
        .form
            // 输入框
            .form-item(
                v-for="( item, index ) in FortInputArr"
                v-bind:key="index"
            )
                span {{ item.title }}
                input(
                    type="text"
                    name="text"
                    required="required"
                    v-bind:placeholder="item.placeholder"
                    autocomplete="off"
                )
            
            // '提交' 按钮
            StateButton(
                v-bind:buttonContentStr="stateButtonContent"
            )
</template>

<script>
/* global Fort: true */ 
import StateButton  from './StateButton'
const components = { StateButton }

export default {
    name: 'FortForm',
    props: {
        // Fort类型
        FortTypeObj: {
            type: Object,
            default: function() {
                return {
                    effects: 'default',                             // Fort.js效果: default / gradient / sections / flash / merge
                    colorArr: ['#FF0']                              // Fort.js颜色: 根据Fort效果类型, 输出不同的颜色( 可能多色 ) 过度条
                }
            }
        },
        // Fort文本框内容
        FortInputArr: {
            type: Array,
            default: function() {
                return [
                    {
                        title: '文本框标题',
                        placeholder: '输入框提示内容'
                    }
                ]
            }
        },
        // Fort高级配置( 进度条宽度 / 过渡时间 / 过渡条位置 )
        FortConfigObj: {
            type: Object,
            default: function() {
                return {
                    isOpen: false,                                  // 是否开启 '高级配置'功能: 默认为 false( 不开启 )
                    height: '10px',
                    duration: '3s',
                    alignment: 'bottom'
                }
            }
        }
    },
    methods: {
        addFort() {
            let effectsType = this.$props.FortTypeObj.effects       // 保存 Fort.js的类型
            let colorArr    = this.$props.FortTypeObj.colorArr      // 保存 颜色数组
            let configObj   = this.$props.FortConfigObj             // 保存 Fort.js 是否需要配置高级配置
            
            // 判断类型
            switch( effectsType ) {
                case 'default':
                    Fort.solid( colorArr )
                    break
                
                case 'gradient': 
                    Fort.gradient( colorArr )
                    break
                
                case 'sections':
                    Fort.sections( colorArr )
                    break
                
                case 'flash':
                    Fort.flash( colorArr )
                    break

                case 'merge':
                    Fort.merge( colorArr )
                    break
                
                default:    // null
            }

            // 判断是否需要 Fort.js 的'高级特性'
            if( configObj.isOpen ) {
                Fort.config({
                    height: configObj.height,
                    duration: configObj.duration,
                    alignment: configObj.alignment
                })
            }
        }
    },
    data() {
        return {
            // 传入 StateButton - 状态按钮的样式( 需要根据 '状态按钮'的 $props 来配置; 也可以不用 专用按钮, 自己写一个按钮 )
            // 注: 使用状态按钮 是想使用 Fort.js的状态回调来操作 改变按钮样式( 未测试 )
            stateButtonStyle: {},
            stateButtonContent: '提交'
        }
    },
    mounted: function() {
        this.addFort()                          // 添加Fort.js 事件
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"
@import "../../assets/style/fort.min.css"
@import "../../assets/style/fortForm.css"

#FortForm

</style>

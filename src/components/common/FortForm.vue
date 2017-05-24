// 通用组件 - Fort.js文本表单( 包含状态按钮 )
<template lang="pug">
#FortForm.form-wrapper
    // action="#"
    form( name="form" )
        .form
            // 输入框
            .form-item(
                v-for="( item, index ) in FortInputArr"
                v-bind:key="index"
            )
                span.formFont {{ item.title }}
                input.formFont(
                    v-bind:type="item.inputType"
                    v-bind:name="item.inputName"
                    v-bind:maxlength="item.maxlength"
                    v-bind:placeholder="item.placeholder"
                    required="required"
                    autocomplete="off"
                )
            
            // '提交' 按钮
            StateButton.auto--moduleMarginTop(
                v-bind:buttonContentStr="stateButtonContent"
            )
</template>

<script>
import StateButton  from './StateButton'
const components = { StateButton }

export default {
    name: 'FortForm',
    props: {
        // Fort文本框内容
        FortInputArr: {
            type: Array,
            default: function() {
                return [
                    {
                        inputName: 'userName',
                        inputType: 'text',
                        maxlength: '20',
                        title: '文本框标题',
                        placeholder: '输入框提示内容'
                    }
                ]
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
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"

#FortForm

.form
    .form-item
        +flexCenter
        +REM( padding, $D-autoPadding )
        +bC( $C-W )
        input
            flex: 3
            border: none

.formFont
    flex: 1
    +REM-fontStyle( $F-assist, $C-title, 2 )

.StateButton
    +flexCenter
    >button
        width: 40%
</style>

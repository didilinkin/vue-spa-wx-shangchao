// 通用组件 - Fort.js文本表单( 包含状态按钮 )
<template lang="pug">
#FortForm.form-wrapper
    // 暂停使用表单方式 - form( name="form" action="#" )
    .form
        // 输入框
        .form-item(
            v-for="( item, index ) in inputArr"
            v-bind:key="index"
        )
            span.formFont {{ item.title }}
            input.formFont(
                v-bind:value="item.itemMsg"
                v-on:input="item.itemMsg = $event.target.value"
                v-bind:type="item.inputType"
                v-bind:name="item.inputName"
                v-bind:maxlength="item.maxlength"
                v-bind:placeholder="item.placeholder"
                required="required"
                autocomplete="off"
            )
        
        // '提交' 按钮
        StateButton.auto--moduleMarginTop(
            v-on:buttonClickEvent="checkInputVal()"
            v-bind:buttonStyleObj="stateButtonStyle"
            v-bind:buttonContentStr="stateButtonContent"
        )
</template>

<script>
// import  VueRouter   from    'vue-router'

import swal         from 'sweetalert2'
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
    methods: {
        checkInputVal() {
            let boolean = this.$data.inputValueNull
            let arr     = this.$data.inputArr 

            // 遍历判断 value值是否为空
            for( let i = arr.length; i--; ) {
                if( arr[i].itemMsg === '' ) {
                    boolean = false
                }
            }

            if( !boolean ) {
                swal(
                    '禁止提交!', 
                    '输入框未填写', 
                    'error'
                )
            } else {
                swal(
                    '成功!',
                    '您的问题已提交',
                    'success'
                )
            }
        }
    },
    data() {
        return {
            // 传入 StateButton - 状态按钮的样式( 需要根据 '状态按钮'的 $props 来配置; 也可以不用 专用按钮, 自己写一个按钮 )
            // 注: 使用状态按钮 是想使用 Fort.js的状态回调来操作 改变按钮样式( 未测试 )
            stateButtonStyle: {
                className: 'auto--themeBackgroundColor'          // 当未全部填入时, 更改状态成禁用状态( .is-disabled )
            },
            stateButtonContent: '提交',
            inputArr: [],
            inputValueNull: true
        }
    },
    mounted: function() {
        this.$data.inputArr = this.$props.FortInputArr
        
        for( let i = this.$data.inputArr.length; i--; ) {
            this.$data.inputArr[i]['itemMsg'] = ''
        }
    },
    components: components
    // ,
    // beforeRouteEnter( _to, _from, next ) {
    //     // 导航离开该组件的对应路由时调用
    //     // 可以访问组件实例 `this`
    //     console.log( 'this is page beforeRouteEnter' )
    //     next()
    // }
    // ,
    // beforeRouteUpdate( _to, _from, next ) {
    //     next()
    // }
    // ,
    // beforeRouteLeave( _to, _from, next ) {
    //     console.log( 'this is page beforeRouteLeave' )
    //     console.log( this )
    //     next()
    // }
    ,
    beforeRouteLeave( _to, _from, next ) {
        if( this ) {
            console.log( 'beforeRouteLeave ' + this )
            // console.log( next )
        } else {
            console.log( 'beforeRouteLeave undefined' )
        }
        next()
    }
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
        color: $C-W
        +radius( 20px )
        +boxShadow( 0, 5px, 20px, $C-theme )
</style>

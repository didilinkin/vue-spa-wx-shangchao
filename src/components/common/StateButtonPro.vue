// 通用组件 - 状态按钮( 绑定父级按钮状态 + 可添加回调事件 )
<template lang="pug">
    .StateButtonPro
        mt-button(
        v-bind:class="buttonStyleObj.className"
        v-bind:size="buttonStyleObj.size"
        v-bind:type="buttonStyleObj.type"
        v-bind:icon="buttonStyleObj.icon"
        v-bind:plain="buttonPlainBoolean"
            @click.native="buttonClickEvent()"
        )
            // 是否需要 自定义图标( 空值则不渲染 )
            img(
            v-if="buttonImgIconObj.iconState === 'img'"
            v-bind:src="buttonImgIconObj.iconImgUrl"
            v-bind:width="buttonImgIconObj.width"
            v-bind:height="buttonImgIconObj.height"
            slot="icon"
            )
            // 按钮内文字( 必填 ) - pug内联( '|'符号 )
            | {{ buttonContentStr }}
</template>

<script>
    /* global require:true */
    export default {
        name: 'StateButtonPro',
        props: {
            // 按钮 - 样式
            buttonStyleObj: {
                type: Object,
                default: function() {
                    return {
                        icon: '',                                                   // 是否使用默认图标( 'more': 更多, 'back': 返回 )
                        className: '',                                              // 禁用状态: is-disabled    +   全局颜色类( 如果UI预设颜色无法满足 )
                        size: 'normal',                                             // 默认尺寸( small, normal, large )
                        type: 'default'                                             // 默认颜色样式( Mint-UI预设颜色: default( 浅灰 ), primary( 蓝色 ), danger( 红色 ) )
                    }
                }
            },
            // 按钮 - 幽灵状态
            buttonPlainBoolean: {
                type: Boolean,
                default: false                                                      // 幽灵按钮( 默认false )
            },
            // 按钮 - 内容
            buttonContentStr: {                                                     // 按钮内标题
                type: String,
                required: true,                                                     // 必填项
                default: 'default'
            },
            // 按钮 - 自定义图标
            buttonImgIconObj: {
                type: Object,
                default: function() {
                    return {
                        iconState: '',                                              // 是否需要自定义icon( '': 不需要 / 'img': 自定义图片图标  )
                        width: '10',
                        height: '10',
                        iconImgUrl: require( '../../assets/images/defaultBtn.png' ) // 自定义图标图片( 需要父级使用require引入, 然后通过props传入 )
                    }
                }
            }
        },
        methods: {
            // 目的: 按钮点击事件( 向父级返回事件 ) => 本身无处理, 只向父级传递事件相应
            buttonClickEvent() {
                this.$emit( 'buttonClickEvent' )
            }
        }
    }
</script>

<style lang="sass">
    @import "../../sass/main"

    .StateButtonPro

</style>

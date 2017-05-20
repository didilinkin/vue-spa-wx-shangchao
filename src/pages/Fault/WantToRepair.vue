// '故障报修' - 我要报修
<template lang="pug">
// .form-wrapper
#WantToRepair
    // 多行文本输入框( 限制500字 )
    .mtextBox
        textarea(
            v-model="message"
            maxlength="500"
            placeholder="请输入问题详情, 以便我们更好地处理"
        )
        p {{ message.length }} / 500

    // 单行文本
    // <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>

    form( name="form" action="#" )
        .form
            // 输入框( 昵称 / 电话号码 )
            .form-item.textBox(
                v-for="( item, index ) in inputTextObj"
                v-bind:key="index"
            )
                span {{ item.title }}
                input.textInput(
                    type="text"
                    name="text"
                    required="required"
                    v-bind:placeholder="item.placeholder"
                    autocomplete="off"
                )

            // '确认'按钮
            .button-panel
                input.button(
                    type="submit"
                    title="Sign In"
                    value="Test It Out"
                )
</template>

<script>
/* global Fort: true */
export default {
    name: 'WantToRepair',
    methods: {
        addFort() {
            Fort.solid( '#23d296' )
        }
    },
    data() {
        return {
            message: '',
            inputTextObj: [
                {
                    title: '报修人',
                    placeholder: '您的称呼'
                }, {
                    title: '电话',
                    placeholder: '您的手机号'
                }
            ]
        }
    },
    mounted: function() {
        this.addFort()
    }
}
</script>

<style lang="sass">
@import "../../sass/main"
@import "../../assets/style/fort.min.css"
@import "../../assets/style/fortForm.css"

#WantToRepair
    +REL
    // 多行文本
    .mtextBox
        +REL
        textarea
            padding: 5%
            width: 90%
            +REM( height, $F-text*11 )
            border: none
            +REM-fontStyle( $F-text, $C-assist,2 )
        >p
            +ABS
            bottom: $D-autoPadding
            right: $D-autoPadding
            +REM-fontStyle( $F-assist, $C-assist )

    // 单行文本框
    .textBox
        display: flex
        padding: 5%
        width: 90%
        +bC( $C-W )
        >span
            flex: 1
            +REM-fontStyle( $F-assist, $C-assist )
        >.textInput
            flex: 4
</style>


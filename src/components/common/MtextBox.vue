// 通用组件 - 多行文本输入框
<template lang="pug">
.MtextBox
    textarea(
        v-model="message"
        b-bind:maxlength="setMtextBoxObj.maxLength"
        v-bind:placeholder="setMtextBoxObj.placeholder"
        v-bind:oninput="test()"
    )
    p {{ message.length }} / {{ setMtextBoxObj.maxLength }}
</template>

<script>
export default {
    name: 'MtextBox',
    props: {
        // 多行文本 - 基本配置
        setMtextBoxObj: {
            type: Object,
            default: function() {
                return {
                    maxLength: 200,
                    placeholder: '提示文本'
                }
            }
        }
    },
    methods: {
        test() {
            console.log( 'test' )
        }
    },
    data() {
        return {
            message: ''
        }
    }
}   
</script>

<style lang="sass">
    
</style>
// '故障报修' - '我要报修'页
<template lang="pug">
    #wantToRepairzy.Fault--module
        // 多行文本输入框( 限制500字 )

        // 图片上传(  )

        // 单行文本
        FortFormzy( v-bind:FortInputArr="fortInputText" )
</template>

<script>
    import FortFormzy     from '../../components/common/FortFormzy'

    const components = { FortFormzy }

    export default {
        name: 'WantToRepairzy',
        mothods: {

        },
        data() {
            return {
                // 多行文本 基本配置
                setMtextBox: {
                    maxLength: 500,
                    placeholder: '请输入问题详情, 以便我们更好地处理'
                },
                // Fort.js 文本框内容
                fortInputText: [
                    {
                        inputName: 'userName',
                        inputType: 'text',
                        maxlength: '10',
                        title: '报修人',
                        placeholder: '您的称呼'
                    }, {
                        inputName: 'phone',
                        inputType: 'number',
                        maxlength: '13',
                        title: '电话',
                        placeholder: '您的手机号'
                    }
                ]
            }
        },
        mounted: function() {
//                console.log( res )
        },
        components: components
    }
</script>

<style lang="sass">
    @import "../../sass/main"
    .addimg
    #wantToRepairzy

</style>


// '故障报修' - 我要报修
<template lang="pug">
#wantToRepair.Fault--module
    // 多行文本输入框( 限制500字 )
    MtextBox( v-bind:setMtextBoxObj="setMtextBox" )

    // 单行文本
    FortForm(
        v-bind:FortTypeObj="fortType"
        v-bind:FortInputArr="fortInputText"
        v-bind:FortConfigObj="fortConfig"
    )
</template>

<script>
import FortForm     from '../../components/common/FortForm'
import MtextBox     from '../../components/common/MtextBox'
const components = { FortForm, MtextBox }

export default {
    name: 'WantToRepair',
    data() {
        return {
            // 多行文本 基本配置
            setMtextBox: {
                maxLength: 500,
                placeholder: '请输入问题详情, 以便我们更好地处理'
            },
            // Fort.js 类型配置
            fortType: {
                effects: 'default',                 // 默认配置
                colorArr: ['#23d296']               // 配置颜色
            },
            // Fort.js 文本框内容
            fortInputText: [
                {
                    title: '报修人',
                    placeholder: '您的称呼'
                }, {
                    title: '电话',
                    placeholder: '您的手机号'
                }
            ],
            // Fort.js 高级配置
            fortConfig: {
                isOpen: false                       // 是否开启 '高级配置'
            }
        }
    },
    components: components
}
</script>

<style lang="sass">
@import "../../sass/main"

#wantToRepair
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
</style>


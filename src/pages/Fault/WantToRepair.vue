// '故障报修' - 我要报修
<template lang="pug">
#WantToRepair
    // 多行文本输入框
    textarea(
        v-model="message"
        maxlength="500"
        placeholder="请输入问题详情, 以便我们更好地处理"
    )
</template>

<script>
export default {
    name: 'WantToRepair',
    data() {
        return {
            message: ''
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

#WantToRepair
    +REL
    // 多行文本
    textarea    
        padding: 5%
        width: 90%
        +REM( height, $F-text*11 )
        border: none
        +REM-fontStyle( $F-text, $C-assist,2 )
        // 最大行数设置
</style>
// 绑定列表
<template lang="pug">
#Bindlist
    .bind-ele
        span 您已绑定
        span.ele-num#num 2
        span 个房间
    .river-list(
        v-for="(todo, index) in arrList"
        v-bind:key="index"
    )
        span.center {{ todo.title }}
        span.unbind 解绑
</template>
<script>
    export default {
        name: 'Bindlist',
        props: {
            // 简要列表( 收起样式 )
            arrList: {
                type: Array
            }
        },
        data() {
            return {
                list: [
                    { title: '长江中心A座-2408' },
                    { title: '长江中心A座-2407' },
                    { title: '长江中心A座-2406' }
                ]
            }
        },
        watch: {
            arrList: function() {
                this.$data.list = this.$props.arrList
            }
        }
    }

</script>
<style lang="sass">
    .bind-ele
        color: rgb( 102,102,102 )
        font-size: 16px
        text-align: left
        margin-top: 20px
        padding-bottom: 10px
        .ele-num
            color: rgb( 35,210,150 )
    .river-list
        background-color: #ffffff
        line-height: 50px
        border-bottom: 1px solid #f7f7fa
        .center
            color: rgb( 102,102,102 )
            font-size: 16px
        .unbind
            width: 54px
            height: 26px
            display: inline-block
            font-size: 14px
            color: #ffffff
            background-color: rgb( 16,142,233 )
            border-radius: 13px
            line-height: 26px
            margin-left: 130px



</style>

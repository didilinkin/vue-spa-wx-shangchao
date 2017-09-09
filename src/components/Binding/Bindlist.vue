// 绑定列表
<template lang="pug">
#Bindlist
    .bind-ele
        span 您已绑定
        span.ele-num {{ number }}
        span 个房间
    .river-list(
        v-for="(todo, index) in list"
        v-bind:key="index"
    )
        span.center  {{ todo.title }}
        span.dddd   {{ todo.id }}
        span.unbind(
           v-on:click="alert( todo.id )"
        ) 解绑
</template>
<script>
import swal from 'sweetalert2'
import { mapGetters }   from 'vuex'

export default {
    name: 'Bindlist',
    methods: {
        requireRoomDelete( id ) {
            this.$store.dispatch({
                type: 'binding/REQUEST_ROOM_DELETE',
                id: id
            })
        },
        alert( id ) {
            const that = this
            swal({
                title: '确定解除绑定吗?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '解除绑定'
            }).then( function() {
                console.log( '5555555555555555555' )
                that.requireRoomDelete( id )
                if( this.getterDeleteUserWx ) {
                    this.$emit( 'watchRequireBuildingList' )
                }
                swal(
                    '解绑成功!',
                    ' ',
                    'success'
                )
            })
        }
    },
    props: {
        // 简要列表( 收起样式 )
        arrList: {
        }
    },
    data() {
        return {
            list: [
                { title: '长江中心A座-1112', id: '1' },
                { title: '长江中心A座-1111', id: '2' },
                { title: '长江中心A座-2222', id: '3' }
            ],
            number: '3',
            msg: '解绑成功!'
        }
    },
    computed: mapGetters({
        getterDeleteUserWx: 'getterDeleteUserWx'
    }),
    watch: {
        arrList: function() {
            this.$data.list = this.$props.arrList.roomList
            this.$data.number = this.$props.arrList.size
        },
        // 监听返回结果
        getterDeleteUserWx: function() {
            this.$data.msg = this.getterDeleteUserWx
            console.log( '6666666666666666666' )
            console.log( this.getterDeleteUserWx )
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
        .dddd
            display: none



</style>

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
        // 目的: 请求 - 房间列表
        requireRoomList() {
            this.$store.dispatch({
                type: 'binding/REQUEST_ROOM_LIST',
                clientNum: this.$data.clientNum
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
                confirmButtonText: '解除绑定',
                cancelButtonText: '取消'
            }).then( function() {
                that.requireRoomDelete( id )
                that.$emit( 'watchRequireRoomList' )
            })
        }
    },
    props: {
        clientNumber: {

        },
        arrList: {
        }
    },
    data() {
        return {
            list: [
            ],
//            number: '3',
            number: '0',
            msg: '解绑成功!',
            clientNum: '1'
        }
    },
    computed: mapGetters({
        getterDeleteUserWx: 'getterDeleteUserWx'
    }),
    watch: {
        arrList: function() {
            this.$data.list = this.$props.arrList.roomList
            this.$data.number = this.$props.arrList.size
            this.$data.clientNum = this.$props.clientNumber
        },
        // 监听返回结果
        getterDeleteUserWx: function() {
            this.$data.msg = this.getterDeleteUserWx
            // this.$emit( 'watchRequireRoomList' )
            if( this.getterDeleteUserWx.success === true ) {
                this.$emit( 'watchRequireRoomList' )
                swal(
                    '解绑成功!',
                    ' ',
                    'success'
                )
            }else {
                swal(
                    '解绑失败!',
                    ' ',
                    'error'
                )
            }
        }
    }
}

</script>
<style lang="sass">
    @import "../../sass/main"
    .bind-ele
        color: rgb( 81, 81, 81 )
        +REM( font-size, 20px )
        text-align: center
        +REM( margin-top, 16px )
        +REM( padding-bottom, 10px )
        .ele-num
            color: rgb( 121, 132, 243 )
    .river-list
        background-color: #ffffff
        +REM( line-height, 50px )
        border-bottom: 1px solid #f7f7fa
        text-align: center
        .center
            color: rgb( 102,102,102 )
            +REM( font-size, 16px )
        .unbind
            /*width: 54px*/
            /*height: 26px*/
            +REM-W-H( 54px, 26px )
            display: inline-block
            +REM( font-size, 14px )
            color: #ffffff
            background-color: rgb( 16,142,233 )
            border-radius: 13px
            +REM( line-height, 26px )
            +REM( margin-left, 130px )
        .dddd
            display: none



</style>

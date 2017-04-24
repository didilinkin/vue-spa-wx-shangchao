// '物业公告' - 公告轴
<template lang="pug">
#BulletinLine
    ul(
        v-if="this.$data.canRender"
        v-infinite-scroll="countBulletin"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="51"
    )
        li.BulletinLine--item(
            v-for="item in renderArr"
            v-bind:key="item.title"
        )
            h2.auto--titleStyle {{ item.title }}
            span.auto--textStyle {{ item.date }}
            span.auto--textStyle {{ item.time }}

    .BulletinLine--null
        // img
        h1 无消息
</template>

<script>
export default {
    name: 'BulletinLine',
    props: {
        bulletinLineArr: {
            type: Array,
            default: function() {
                return [
                    {
                        id: 100,
                        title: '测试标题',
                        text: `测试文字测试文字测试文字测试文字测试文字
                                测试文字测试文字测试文字测试文字
                                测试文字测试文字`,
                        date: '2017-04-20',
                        time: '08:13'
                    }
                ]
            }
        }
    },
    methods: {
        // 目的: 计算'公告'
        countBulletin() {
            let awaitNum = this.$data.bulletinNum - 10 * this.$data.loadNum             // 等待渲染'公告' 数
            let multipleNum = parseInt( awaitNum / 10 )                                 // 等待渲染'公告' 是否是 10的倍数
            multipleNum <= 0 ? this.loadMore( awaitNum ) : this.loadMore( 10 )
        },
        // 目的: 加载更多
        loadMore( num ) {
            if( this.$data.loadNum === 0 ) {                                            // 初次加载 不需等待
                this.countRender( num )
            } else {
                if( this.$data.loadNum <= this.$data.maxMultiple ) {
                    // console.log( '加载更多' )
                    this.$data.loading = true
                    setTimeout( () => {
                        this.countRender( num )
                        this.$data.loading = false
                    }, 3000 )
                } else {
                    // console.log( '禁止再加载' )
                    this.$data.loading = false
                }
            }
        },
        // 目的: 计算 $data 渲染数组
        countRender( num ) {
            for( let i = 0; i < num; i++ ) {
                let addBulletinObj = this.$props.bulletinLineArr[i + 10 * this.$data.loadNum]
                this.$data.renderArr.push( addBulletinObj )
            }
            this.$data.loadNum = this.$data.loadNum + 1                                 // 记录次数
        }
    },
    data() {
        return {
            loading: false,
            canRender: false,                                                           // 可否渲染数据
            renderArr: [],                                                              // 用于渲染的数组( 需要将 $props的数据赋值 )
            bulletinNum: 0,                                                             // 记录 $props中 '公告'数量
            loadNum: 0,                                                                 // 加载次数
            maxMultiple: 0                                                              // 最大倍数
        }
    },
    watch: {
        bulletinLineArr: function() {
            let bulletinLength = this.$props.bulletinLineArr.length
            if( typeof bulletinLength === 'number' && bulletinLength > 0 ) {
                this.$data.canRender = true                                             // 可渲染
                this.$data.bulletinNum = bulletinLength                                 // 保存'公告'数量
                this.$data.maxMultiple = parseInt( bulletinLength / 10 )                // 保存最大倍数
                this.countBulletin()
            } else {
                this.$data.canRender = false                                            // 不可 -> 显示'无消息'图片
            }
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

#BulletinLine
    .BulletinLine--item
        +REM-padding-TB( $D-autoPadding )
        +mL( .5rem )
        +pL( .5rem )
        border-left: 1px solid $C-title
        &:first-child
            padding-top: 0
        >span:first-of-type
            +REM( margin-right, $D-autoMargin )
</style>

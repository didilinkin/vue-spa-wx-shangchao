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
/* global Promise:true */
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
        // 目的: 计算'公告' - 负责计算当前环境量
        countBulletin() {
            let awaitNum = this.$data.bulletinNum - 10 * this.$data.loadNum                                     // 等待渲染'公告' 数
            let multipleNum = parseInt( awaitNum / 10 )                                                         // 等待渲染'公告' 计算10的倍数
            if( awaitNum > 0 ) {                                                                                // 负值 & =0 => 渲染完成, 不再渲染
                multipleNum === 0 ? this.countLoad( awaitNum ) : this.countLoad( 10 )                           // 倍数是否小于0 ? 渲染当前数 + 余数( 可不用 ) : 渲染10个 + 余数( 判断是否整除后, 无余数 => 不再渲染 )
            } 
        },
        // 目的: 加载更多 - 根据 环境量的参数, 进行逻辑判断( 是否调用计时器 )
        countLoad( num ) {
            // 是否是第一次加载 => 不执行计时器
            // 第一个参数 是否等于10( '公告'数 > 10 => 判断是否有余数 )
                // 余数 === 0, 那么 已整除
                // 余数 != 0
            // 第一个参数 不等于10( '公告'数 < 10 => 直接渲染第一个参数 )
            if( this.$data.loadNum === 0 ) {                                                                    // 初次加载
                this.countRender( num )             
            } else {
                if( num === 10 ) {                                                                              // > 10
                    this.asyncTime( 10 )
                } else {                                                                                        // < 10
                    this.asyncTime( num )
                }
            }
        },
        // 目的: async计时器函数
        asyncTime( asyncNum ) {
            this.$data.loading = true
            let that = this                                                                                     // 保存 this
            
            let countLoadTime = function() {                                                                    // 计时器 - 通过逻辑判断, 使用回调调用
                return new Promise( ( resolve ) => {
                    setTimeout( resolve, 2000 )
                })
            }

            let asyncSetTimeOut = async function( asyncNum ) {
                await countLoadTime()
                that.$data.loading = false
                that.countRender( asyncNum )                                                                    // 将逻辑传入的参数( asyncNum ) 传给计算函数
            }

            asyncSetTimeOut( asyncNum )
        },
        // 目的: 计算 $data 渲染数组 + 修改 $data.loadNum 加载次数
        countRender( num ) {
            for( let i = 0; i < num; i++ ) {
                let addBulletinObj = this.$props.bulletinLineArr[i + 10 * this.$data.loadNum]
                this.$data.renderArr.push( addBulletinObj )
            }
            let timeNum = this.$data.loadNum                                                                    // 重复次数 
            this.$data.loadNum = timeNum + 1                                                                    // 完成逻辑 次数加1
        }
    },
    data() {
        return {
            loading: false,
            canRender: false,                                                                                   // 可否渲染数据
            renderArr: [],                                                                                      // 用于渲染的数组( 需要将 $props的数据赋值 )
            bulletinNum: 0,                                                                                     // 记录 $props中 '公告'数量
            loadNum: 0                                                                                          // 加载次数
        }
    },
    watch: {
        bulletinLineArr: function() {
            let bulletinLength = this.$props.bulletinLineArr.length
            if( typeof bulletinLength === 'number' && bulletinLength > 0 ) {
                this.$data.canRender = true                                                                     // 可渲染
                this.$data.bulletinNum = bulletinLength                                                         // 保存'公告'数量
                this.$data.maxMultiple = parseInt( bulletinLength / 10 )                                        // 保存最大倍数
                this.countBulletin()
            } else {
                this.$data.canRender = false                                                                    // 不可 -> 显示'无消息'图片
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

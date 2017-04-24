// 通用组件 - 时间轴
<template lang="pug">
.timeLine
    ul(
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="51"
    )  
        // 渲染 传入的 $props数组
        li.timeLine__item(
            v-for="item in renderListArr"
            v-bind:key="item.title"
        )
            // '公告' - 时间轴
            .timeLine--bulletin( v-if="renderBulletinBoolean" )
                h2.timeLine--title {{ item.title }}
                span.timeLine--date {{ item.date }}
                span.timeLine--time {{ item.time }}

                
            // 详情类 - 时间轴
            .timeLine--details( v-else )
</template>

<script>
export default {
    name: 'TimeLine',
    props: {
        // 渲染'公告'
        renderBulletinBoolean: {
            type: Boolean,
            default: true
        },
        // 渲染列表内容
        renderListArr: {
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
                        time: '08:23',
                        starRating: 4,
                        hasContent: true,
                        acceptor: 'Tom',            // 受理人
                        maintenanceMan: 'John',     // 维修人
                        maintenanceFees: 40         // 维护费用
                    }   
                ]
            }
        }
    },
    methods: {
        // 目的: 下拉自动加载
        loadMore() {
            this.loading = true     // 改变加载状态 -> 加载状态 true
            setTimeout( () => {
                console.log( '延迟加载' )

                // let arrLength = this.renderListArr.length / 2

                // let last = this.renderListArr[arrLength - 1]

                // for( let i = 1; i <= 10; i++ ) {
                //     this.renderListArr.push( last + i )
                // }

                // 目的: 向 $data 中用于展示的数组添加一个新的内容( 一般添加10个 )

                this.loading = false
            }, 3000 )
        }
        // 目的: 当传入的数组 数量大于10 -> 执行滚动加载事件
    },
    data() {
        return {
            loading: false,
            timeLineArr: []
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

.timeLine
    // 结构样式
    ul 
        >li
            +REM-padding-TB( $D-autoPadding )
    
    // 具体样式
    .timeLine__item
        +mL( .5rem )
        +pL( .5rem )
        border-left: 1px solid $C-title
    .timeLine--title
        +REM-fontStyle( $F-title, $C-title )
    .timeLine--time, .timeLine--date, .timeLine--text
        +REM-fontStyle( $F-text, $C-text )
        +REM( margin-right, $D-autoMargin )
</style>
// 通用组件 - 时间轴
<template lang="pug">
.timeLine
    ul(
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0"
    )
        // 渲染 传入的 $props数组
        .timeLine__item(
            v-for="item in renderListArr"
            v-bind:key="item.title"
        )
            // '公告' - 时间轴
            .timeLine--bulletin( v-if="renderBulletinBoolean" )
                h2.timeLine--title {{ item.title }}
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
            this.loading = true
            setTimeout( () => {
                let last = this.list[this.list.length - 1]
                for ( let i = 1; i <= 10; i++ ) {
                    this.list.push( last + i )
                }
                this.loading = false
            }, 2500 )
        }
    }
}
</script>

<style lang="sass">
@import "../../sass/main"

.timeLine
    .timeLine__item
        +mL( .5rem )
        +pL( .5rem )
        border-left: 1px solid $C-title
    .timeLine--title
        +REM-fontStyle( $F-title, $C-title )
    .timeLine--time, .timeLine--data, .timeLine--text
        +REM-fontStyle( $F-text, $C-text )
</style>
// '故障报修' - 报修进度( 进度轴 )
<template lang="pug">
    #Schedule.auto--moduleMarginTop
        h1.auto--moduleMarginBottom.plan 进度
        // 进度轴
        ul.progress
            li.line.auto--moduleMarginBottom( v-if="progressType > 4" )
                .icon
                    i.fa( class="fa fa-star" )
                .contentBox
                    h3.client-f  客户已评价
                    p.data {{ scheduleObj.evaluation.time }}
                    star-rating.auto--moduleMarginBottom.pentagon-star(
                    v-bind:rating="scheduleObj.evaluation.starNum"
                    v-bind:read-only="true"
                    v-bind:star-size="20"
                    )
                    .string

            li.line.auto--moduleMarginBottom( v-if="progressType > 3 " )
                div.icon
                    i.fa( class="fa fa-check-square-o" )
                .contentBox
                    h3.client-f 已处理完毕
                    p.people 维修人: {{ scheduleObj.finished.repair }}
                    p.price 维修费:
                        b.fault--maintenanceFees  {{ scheduleObj.finished.maintenanceFees }}
                        | 元
                    p.time {{ scheduleObj.finished.time }}
                    .wire

            li.line.auto--moduleMarginBottom( v-if="progressType > 2" )
                div.icon
                    i.fa( class="fa fa-clock-o" )
                .contentBox
                    h3.client-f 已开始处理
                    p.people 维修人: {{ scheduleObj.doing.repair }}
                    p.time {{ scheduleObj.doing.time }}
                    .string

            li.line.auto--moduleMarginBottom( v-if="progressType > 1" )
                div.icon
                    i.fa( class="fa fa-rocket" )
                .contentBox
                    h3.client-f 已派单
                    p.people 受理人: {{ scheduleObj.send.acceptor }}
                    p.time {{ scheduleObj.send.time }}
                    .string

            li.line.auto--moduleMarginBottom
                .icon
                    i.fa( class="fa fa-user-o" )
                .contentBox
                    h3.client-f 客户已提交报修
                    p.time {{ scheduleObj.submitted.time }}
</template>

<script>
    import StarRating from 'vue-star-rating'
    const components = { StarRating }

    export default {
        name: 'Schedule',
        props: {
            // '进度' 类型(数值型, 用于比较) 进度类型( 根据 $props 判断展示状态 )
            progressType: {
                type: Number,
                default: function() {
                    return 5
                }
            },
            // '进度' 进度条 数据( 服务端返回的完整数据 )
            scheduleObj: {
                type: Object,
                default: function() {
                    return {
                        // 已评价
                        evaluation: {
                            time: '2017-01-14 11:24',
                            starNum: 4
                        },
                        // 已处理完毕
                        finished: {
                            time: '2017-01-14 16:24',
                            repair: '张丽浩  刘鹏涛',
                            maintenanceFees: 40
                        },
                        // 已开始处理
                        doing: {
                            time: '2017-01-14 16:24',
                            repair: '李方云'
                        },
                        // 已派单
                        send: {
                            time: '2017-01-14 16:24',
                            acceptor: '李方云'
                        },
                        // 客户已提交保修
                        submitted: {
                            time: '2017-01-14 16:24'
                        }
                    }
                }
            },
            data() {
                return {
                    public: '2'
                }
            }
        },
        components: components
    }
</script>

<style lang="sass">
    @import "../../sass/main.sass"

    #Schedule
        +bC( $C-W )
        .plan
            color: rgb( 51, 51, 51 )
            +REM-fontStyle( $F-title, 2 )
            +mL( 16px )
            +pT( 15px )
        .progress
            +pB( 76px )
            .line
                border-bottom: none
                .icon
                    +REM-W-H( 50px )
                    +flexCenter
                    +bC( rgb(204,204,204) )
                    +REM( border-radius, 25px )
                    +mL( 20px )
                    +mT( 24px )
                    .fa
                        color: #fff
                        +REM( font-size, 25px )
                .contentBox
                    position: relative
                    .client-f
                        color: rgb( 102, 102, 102 )
                        +REM-fontStyle( $F-title, $C-title, 2 )
                        +mL( 80px)
                        +mT( -60px)
                    .data
                        +mL( 80px)
                        +mT( -5px)
                        +REM( font-size, $F-text)
                        color: #666
                    .pentagon-star
                        +mL( 41px )
                        +pL( 35px )
                    .string
                        +REM-W-H( 1px, 63px )
                        background-color: #ccc
                        +ABS
                        left: 45px
                        top: 50px
                    .people
                        +mL( 80px )
                        +mT( -5px )
                        +REM-fontStyle( $F-text, 2.5 )
                        color: rgb( 153, 153, 153 )
                    .price
                        +mL( 80px )
                    .time
                        +mL( 80px )
                        +REM-fontStyle( $F-text, $C-text )
                    .wire
                        +REM-W-H( 1px, 80px )
                        background-color: #ccc
                        position: absolute
                        left: 45px
                        top: 50px
</style>

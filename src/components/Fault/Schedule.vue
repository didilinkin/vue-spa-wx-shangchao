// '故障报修' - 报修进度( 进度轴 )
<template lang="pug">
#Schedule.auto--moduleMarginTop
    h1.auto--moduleMarginBottom 进度
    // 进度轴
    ul.progress
        li( v-if="progressType > 4" )
            i.fa( class="fa fa-star" )
            .contentBox
                h3 客户已评价
                p {{ scheduleObj.evaluation.time }}
                star-rating.auto--moduleMarginBottom(
                    v-bind:rating="scheduleObj.evaluation.starNum"
                    v-bind:read-only="true"
                    v-bind:star-size="20"
                )


        li( v-if="progressType > 3 " )
            i.fa( class="fa fa-check-square-o" )
            .contentBox
                h3 已处理完毕
                p 维修人: {{ scheduleObj.finished.repair }}
                p 维修费:
                    b.fault--maintenanceFees {{ scheduleObj.finished.maintenanceFees }}
                    | 元
                p {{ scheduleObj.finished.time }}

        li( v-if="progressType > 2" )
            i.fa( class="fa fa-clock-o" )
            .contentBox
                h3 已开始处理
                p 维修人: {{ scheduleObj.doing.repair }}
                p {{ scheduleObj.doing.time }}

        li( v-if="progressType > 1" )
            i.fa( class="fa fa-rocket" )
            .contentBox
                h3 已派单
                p 受理人: {{ scheduleObj.send.acceptor }}
                p {{ scheduleObj.send.time }}

        li
            i.fa( class="fa fa-user-o" )
            .contentBox
                h3 客户已提交报修
                p {{ scheduleObj.submitted.time }}
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
</style>

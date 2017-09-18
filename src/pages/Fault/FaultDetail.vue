// '故障报修' - '故障详情'页
<template lang="pug">
    #FaultDetail
        // 报修评价( 评星 )
        Evaluation(
            v-if="this.$data.showEvaluation === true"
            v-on:watchRequireFaultDetail="requireFaultDetail"
        )
        // 报修状态
        RepairState(
            v-bind:repairStateArr="repairState"
            v-bind:canClickBoolean="false"
        )
        // 进度轴
        Schedule(
            v-bind:scheduleObj="detailObj"
            v-bind:progressType="progressSize"
        )
</template>

<script>
import { mapGetters }   from 'vuex'

import Evaluation   from    '../../components/Fault/Evaluation'
import RepairState  from    '../../components/Fault/RepairState'
import Schedule     from    '../../components/Fault/Schedule'
const components = { Evaluation, RepairState, Schedule }

export default {
    name: 'FaultDetail',
    methods: {
        // 目的: 根据当前 打开的 评价 ID, 去后台获取详细 进度
        requireFaultDetail() {
            this.$store.dispatch({
                type: 'fault/REQUIRE_FAULT_DETAIL',
                detailId: this.$route.params.id // url ID
            })
        },
        // 目的: 判断是否需要显示 '评分' 功能
        judgeShowEvaluation() {
            if( this.$data.faultDetailObj.stateType === 'evaluation' ) {      // 当 '进度状态' 为 '已完成'时 => 显示 '评分'组件; 否则不显示
                this.$data.showEvaluation = false
            } else {
                this.$data.showEvaluation = true
            }
        },
        // 设置 '报修状态' 接口需要的 数组
        setRepairProps() {
            let arr = []
            let obj = this.$data.faultDetailObj                             // 测试 将保存的状态 保存到 对象, 然后渲染 => 状态组件
            arr.push( obj )
            this.$data.repairState = arr
        }
    },
    data() {
        return {
            faultDetailObj: this.$store.state.fault.repairDetail,           // 详情对象( 在跳转前已保存 )
            showEvaluation: false,
            repairState: [],
            progressSize: 1,
            detailObj: {},
            evaluation: {},
            finished: {},
            doing: {},
            send: {},
            ratedStatus: [],
            submitted: {}
        }
    },
    computed: mapGetters({
        getterFaultDetail: 'getterFaultDetail'
    }),
    watch: {
        // 当 公告内容获取到, 触发
        getterFaultDetail: function() {
//            console.log( '2222222222222222' )
//            console.log( this.$data.repairState )
//            console.log( '2222222222222222' )
//            console.log( this.$data.faultDetailObj )
//            console.log( '2222222222222222' )
//            console.log( this.getterFaultDetail )
//            console.log( '2222222222222222' )
//            console.log( this.getterFaultDetail.ratedStatus )
//            console.log( '3333333333333333333' )
            this.$data.ratedStatus = this.getterFaultDetail.ratedStatus
            this.$data.detailObj = this.getterFaultDetail
            if( this.getterFaultDetail.ratedStatus === 1 ) {
                this.$data.progressSize = 5
            }else if( this.getterFaultDetail.repairStatus === 1 ) {
                this.$data.progressSize = 4
            }else if( this.getterFaultDetail.pieStatus === 1 ) {
                this.$data.progressSize = 2
            }else {
                this.$data.progressSize = 1
            }
//            console.log( this.getterFaultDetail )
//            console.log( this.getterFaultDetail.ratedStatus )
//            console.log( this.getterFaultDetail.repairStatus )
//            console.log( this.getterFaultDetail.pieStatus )
//            console.log( this.$data.progressSize )
//            console.log( '111111111111111111111111' )

            this.judgeShowEvaluation()
            this.setRepairProps()
        }
    },
    mounted: function() {
        this.requireFaultDetail()
        // this.judgeShowEvaluation()
        // this.setRepairProps()
    },
    components: components
}
</script>


// '故障报修' - '故障详情'页
<template lang="pug">
#FaultDetail
    // 报修评价( 评星 )
    Evaluation( v-if="showEvaluation" )
    // 报修状态
    RepairState(
        v-bind:repairStateArr="repairState"
        v-bind:canClickBoolean="false"
    )
    // 进度轴
    Schedule()
</template>

<script>
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
                detailId: '2' // url ID
            })
        },
        // 目的: 判断是否需要显示 '评分' 功能
        judgeShowEvaluation() {
            if( this.$data.faultDetailObj.stateType === 'finished' ) {      // 当 '进度状态' 为 '已完成'时 => 显示 '评分'组件; 否则不显示
                this.$data.showEvaluation = true
            } else {
                this.$data.showEvaluation = false
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
            repairState: []
        }
    },
    mounted: function() {
        this.requireFaultDetail()
        this.judgeShowEvaluation()
        this.setRepairProps()
    },
    components: components
}
</script>


// '故障报修' - '故障详情'页
<template lang="pug">
#FaultDetail
    // 报修评价
    Evaluation( v-if="showEvaluation" )
    // 报修状态
    RepairState(
        v-bind:repairStateArr="repairState"
        v-bind:canClickBoolean="false"
    )
    Schedule(  )
</template>

<script>
import Evaluation   from    '../../components/Fault/Evaluation'
import RepairState  from    '../../components/Fault/RepairState'
import Schedule     from    '../../components/Fault/Schedule'
const components = { Evaluation, RepairState, Schedule }

export default {
    name: 'FaultDetail',
    methods: {
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
            let arr = this.$data.repairState

            // 测试
            let obj = {
                id: 45641,
                stateType: 'submitted',
                stateTitle: '已提交',
                dateTime: '2016-05-25 11:46',
                text: `此处是已提交文本此处是已提交文本
                        此处是已提交文本此处是已提交文本
                        此处是已提交文本此处是已提交文本`,
                showSchedule: 'submitted',                      // 进度状态: '已提交' ( 用于显示'进度' - 因'已处理'无法判断, 所以添加此属性 )
                // '进度' - 具体信息
                submittedInfo: {                                // '已提交'的信息
                    dateTime: '2016-05-25 11:46'
                }
            }

            // arr.push( this.$data.faultDetailObj )
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
        this.judgeShowEvaluation()                                         
        this.setRepairProps()                                               
    },
    components: components
}
</script>


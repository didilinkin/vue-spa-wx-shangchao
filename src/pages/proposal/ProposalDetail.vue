// '故障报修' - '故障详情'页
<template lang="pug">
    #ProposDetail
        // 报修评价( 评星 )
        EvaluationPro(
            v-if='this.$data.ratedStatus === 0'
            v-on:watchRequireFaultDetail="requireFaultDetail"
        )
        // 报修状态
        ProposalStatePro(
            v-bind:repairStateArr="repairState"
            v-bind:canClickBoolean="false"
            v-bind:createDate="this.$data.createDate"
            v-bind:complaintContent="this.$data.complaintContent"
            v-bind:stateTitle="this.$data.stateTitle"
        )
        // 进度轴
        SchedulePro(
            v-bind:scheduleObj='detailObj'
            v-bind:progressType='this.$data.progressSize'
            v-bind:createDate="this.$data.createDate"
            v-bind:star="this.$data.star"
            v-bind:ratedDate="this.$data.ratedDate"
            v-bind:handleContent="this.$data.handleContent"
        )
</template>

<script>
    import { mapGetters }   from 'vuex'

    import EvaluationPro   from    '../../components/proposal/EvaluationPro'
    import ProposalStatePro  from    '../../components/proposal/RepairStatePro'
    import SchedulePro     from    '../../components/proposal/SchedulePro'
    const components = { EvaluationPro, ProposalStatePro, SchedulePro }

    export default {
        name: 'ProposalDetail',
        methods: {
            // 目的: 根据当前 打开的 评价 ID, 去后台获取详细 进度
            requireFaultDetail() {
                this.$store.dispatch({
                    type: 'proposal/REQUIRE_PROPOSAL_DETAIL',
                    detailId: this.$route.params.id // url ID
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
                faultDetailObj: this.$store.state.proposal.detail,           // 详情对象( 在跳转前已保存 )
                showEvaluation: false,
                repairState: [],
                progressSize: [],
                detailObj: {},
                ratedStatus: [],
                createDate: [],
                stateTitle: [],
                star: [],
                ratedDate: [],
                complaintContent: [],
                handleContent: []
            }
        },
        computed: mapGetters({
            getterProposalDetail: 'getterProposalDetail'
        }),
        watch: {
            getterProposalDetail: function() {
                this.$data.ratedStatus = this.getterProposalDetail.data.ratedStatus
                this.$data.createDate = this.getterProposalDetail.data.createDate
                this.$data.complaintContent = this.getterProposalDetail.data.complaintContent
                this.$data.stateTitle = this.getterProposalDetail.data.stateTitle
                this.$data.star = this.getterProposalDetail.data.star
                this.$data.ratedDate = this.getterProposalDetail.data.ratedDate
                this.$data.handleContent = this.getterProposalDetail.data.handleContent
                if( this.getterProposalDetail.data.ratedStatus === 1 ) {      // 当 '进度状态' 为 '已完成'时 => 显示 '评分'组件; 否则不显示
                    this.$data.progressSize = 5
                } else {
                    this.$data.progressSize = 2     // 进度显示  未完成 评价不显示
                }

                if( this.getterProposalDetail.data.ratedStatus === 0 ) {      // 当 '进度状态' 为 '已完成'时 => 显示 '评分'组件; 否则不显示
                    this.$data.showEvaluation = true
                } else {
                    this.$data.showEvaluation = false
                }
            },
            // 监听: $props 传入后, 执行
            repairStateArr: function() {
                this.judgeRepairStateNull()
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


// '故障报修' - '我的报修'页
<template lang="pug">
#myProposal.Fault--module
    // 说明: 因为渲染组件需要复用, 所以需要在一个渲染组件内进行渲染
    RepairStatePro(
        v-bind:repairStateArr="repairStatePro"
        v-bind:canClickBoolean="true"
    )
</template>

<script>
    import { mapGetters }   from 'vuex'
    import RepairStatePro      from '../../components/Proposal/RepairStatePro'
    const components = { RepairStatePro }

    export default {
        name: 'myProposal',
        methods: {
            // 目的: 发起请求 - 获取最新的公告信息
            requireBulletinInfo() {
                this.$store.dispatch({
                    type: 'proposal/REQUIRE_PROPOSAL_LIST',
                    clientNum: '1'
                })
            }
        },
        data() {
            return {
                repairStatePro: [
                    {
                        id: 45641,
                        stateType: 'submitted',
                        stateTitle: '已提交',
                        dateTime: '2016-05-25 11:46',
                        text: `此处是已提交文本此处是已提交文本
                            此处是已提交文本此处是已提交文本
                            此处是已提交文本此处是已提交文本`,
                        showSchedule: 'submitted',                                  // 进度状态: '已提交' ( 用于显示'进度' - 因'已处理'无法判断, 所以添加此属性 )
                        // '进度' - 具体信息
                        submittedInfo: {                                            // '已提交'的信息
                            dateTime: '2016-05-25 11:46'
                        }
                    }, {
                        id: 65189,
                        stateType: 'send',
                        stateTitle: '已派单',
                        dateTime: '2016-11-12 11:51',
                        text: `此处是已派单文本此处是已派单文本
                            此处是已派单文本此处是已派单文本`,
                        showSchedule: 'send',                                       // 进度状态: '已派单'
                        // '进度' - 具体信息
                        submittedInfo: {
                            dateTime: '2016-05-25 11:46'
                        },
                        sendInfo: {
                            handlePeople: '张先生( 处理人 )',
                            dateTime: '2016-11-12 11:51'
                        }
                    }, {
                        id: 65655,
                        stateType: 'send',
                        stateTitle: '已派单',
                        dateTime: '2016-11-13 12:55',
                        text: `此处是已派单文本此处是已派单文本
                            此处是已派单文本此处是已派单文本`,
                        showSchedule: 'beingProcessed',                             // 进度状态: '开始处理'
                        // '进度' - 具体信息
                        submittedInfo: {
                            dateTime: '2016-05-25 11:46'
                        },
                        sendInfo: {
                            handlePeople: '张先生( 处理人 )',
                            dateTime: '2016-11-12 11:51'
                        },
                        beingProcessedInfo: {
                            repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                            dateTime: '2016-11-13 12:55'
                        }
                    }, {
                        id: 16598,
                        stateType: 'finished',
                        stateTitle: '已完工',
                        dateTime: '2016-07-11 12:12',
                        text: `此处是已完工文本此处是已完工文本
                            此处是已完工文本`,
                        showSchedule: 'finished',                                   // 进度状态: '已完工'
                        // '进度' - 具体信息
                        submittedInfo: {
                            dateTime: '2016-05-25 11:46'
                        },
                        sendInfo: {
                            handlePeople: '张先生( 处理人 )',
                            dateTime: '2016-11-12 11:51'
                        },
                        beingProcessedInfo: {
                            repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                            dateTime: '2016-11-13 12:55'
                        },
                        finishedInfo: {
                            repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                            maintenanceFees: 30,                                    // 维修费
                            dateTime: '2016-07-11 12:12'
                        }
                    }, {
                        id: 35648,
                        stateType: 'evaluation',
                        stateTitle: '已评价',
                        dateTime: '2016-01-22 15:34',
                        text: `此处是已评价文本此处是已评价文本
                            此处是已评价文本此处是已评价文本
                            此处是已评价文本`,
                        showSchedule: 'evaluation',                                 // 进度状态: '已评价'
                        // '进度' - 具体信息
                        submittedInfo: {
                            dateTime: '2016-05-25 11:46'
                        },
                        sendInfo: {
                            handlePeople: '张先生( 处理人 )',
                            dateTime: '2016-11-12 11:51'
                        },
                        beingProcessedInfo: {
                            repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                            dateTime: '2016-11-13 12:55'
                        },
                        finishedInfo: {
                            repairMan: '王先生( 维修人 ) 刘先生( 维修人 )',
                            maintenanceFees: 30,                                    // 维修费
                            dateTime: '2016-07-11 12:12'
                        },
                        evaluationInfo: {                                           // 评价信息
                            dateTime: '2016-01-22 15:34',
                            score: 4                                                // 评分星星数
                        }
                    }
                ]
            }
        },
        computed: mapGetters({
            getterrProposalList: 'getterrProposalList'
        }),
        watch: {
            // 当 公告内容获取到, 触发
            getterrProposalList: function() {
                this.$data.repairStatePro = this.getterrProposalList.data.list
            }
        },
        mounted: function() {
            this.requireBulletinInfo()
        },
        components: components
    }
</script>

<style lang="sass">

    #myProposal
</style>

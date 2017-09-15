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
//                clientNum: this.$route.query.clientNum
                })
            }
        },
        data() {
            return {
                repairStatePro: [
                    {
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

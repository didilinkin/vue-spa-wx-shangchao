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

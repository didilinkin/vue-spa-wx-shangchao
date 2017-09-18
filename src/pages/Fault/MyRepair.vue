// '故障报修' - '我的报修'页
<template lang="pug">
#myRepair.Fault--module
    // 说明: 因为渲染组件需要复用, 所以需要在一个渲染组件内进行渲染
    RepairState(
        v-bind:repairStateArr="repairState"
        v-bind:canClickBoolean="true"
    )
</template>

<script>
import { mapGetters }   from 'vuex'
import RepairState      from    '../../components/Fault/RepairState'
const components = { RepairState }

export default {
    name: 'myRepair',
    methods: {
        // 目的: 发起请求 - 获取最新的公告信息
        requireBulletinInfo() {
            this.$store.dispatch({
                type: 'fault/REQUIRE_FAULT_LIST',
                clientNum: 'this.$route.query.clientNum'
                // clientNum: 1
            })
        }
    },
    data() {
        return {
            repairState: [

            ]
        }
    },
    computed: mapGetters({
        getterrList: 'getterrList'
    }),
    watch: {
        // 当 公告内容获取到, 触发
        getterrList: function() {
            this.$data.repairState = this.getterrList.data.repairList
        }
    },
    mounted: function() {
        this.requireBulletinInfo()
    },
    components: components
}
</script>

<style lang="sass">

#myRepair
</style>
